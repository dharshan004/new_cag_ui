<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\AdminAuditLog;
use Illuminate\Support\Facades\Hash;

class AdminCrudController extends Controller
{
    public function dashboardStats()
    {
        $tables = [
            'audit_reports', 'news', 'notifications', 'admin_users',
            'media_gallery', 'publications', 'pages', 'events',
            'recruitment_notices', 'tenders', 'public_consultations', 'contact_submissions'
        ];

        $counts = [];
        foreach ($tables as $t) {
            $counts[$t] = DB::table('cag_new.' . $t)->count();
        }

        $recentLogs = DB::table('cag_new.admin_audit_log as al')
            ->leftJoin('cag_new.admin_users as au', 'al.user_id', '=', 'au.id')
            ->select('al.*', 'au.full_name')
            ->orderBy('al.created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'counts' => $counts,
            'recentLogs' => $recentLogs
        ]);
    }

    public function index(Request $request)
    {
        $table = $request->query('table');
        if (!$table) {
            return response()->json(['error' => 'Table parameter is required'], 400);
        }

        $id = $request->query('id');
        $fullTable = 'cag_new.' . $table;

        if ($id) {
            $row = DB::table($fullTable)->where('id', $id)->first();
            return response()->json([
                'data' => $row ? [$row] : []
            ]);
        }

        $page = (int) $request->query('page', 1);
        $limit = (int) $request->query('limit', 15);
        $search = $request->query('search');
        $searchCol = $request->query('searchCol');
        $query = DB::table($fullTable);

        if ($search && $searchCol) {
            $query->where($searchCol, 'ILIKE', '%' . $search . '%');
        }

        $total = $query->count();
        $offset = ($page - 1) * $limit;
        
        $rows = DB::table($fullTable)
            ->when($search && $searchCol, function($q) use ($searchCol, $search) {
                $q->where($searchCol, 'ILIKE', '%' . $search . '%');
            })
            ->orderBy('id', 'desc')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => $rows,
            'total' => $total,
            'page' => $page,
            'totalPages' => ceil($total / $limit)
        ]);
    }

    public function store(Request $request)
    {
        $table = $request->query('table');
        $payload = $request->json()->all();
        $data = $payload['data'] ?? $payload;

        if (!$table || empty($data)) {
            return response()->json(['error' => 'Table and data are required'], 400);
        }

        $fullTable = 'cag_new.' . $table;
        
        // Remove empty or disallowed fields
        unset($data['id']);
        
        // Get valid columns from table in cag_new schema
        $validColumns = $this->getTableColumns($table);
        $filteredData = array_intersect_key($data, array_flip($validColumns));

        if ($table === 'admin_users' && isset($filteredData['password_hash'])) {
            $filteredData['password_hash'] = Hash::make($filteredData['password_hash']);
        }

        if (in_array('created_at', $validColumns)) {
            $filteredData['created_at'] = now();
        }
        if (in_array('updated_at', $validColumns)) {
            $filteredData['updated_at'] = now();
        }

        try {
            $id = DB::table($fullTable)->insertGetId($filteredData);
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() == '23505') {
                return response()->json([
                    'error' => 'A record with this unique value (such as slug, title, or code) already exists. Please enter a different value.'
                ], 409);
            }
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Audit Log
        AdminAuditLog::create([
            'user_id' => 2, // Default admin ID
            'action' => 'CREATE',
            'table_name' => $table,
            'record_id' => (string) $id,
            'ip_address' => $request->ip(),
            'new_data' => json_encode(['fields' => array_keys($filteredData)]),
            'created_at' => now(),
        ]);

        return response()->json(['success' => true, 'id' => $id]);
    }

    public function update(Request $request)
    {
        $table = $request->query('table');
        $id = $request->query('id');
        $payload = $request->json()->all();
        $data = $payload['data'] ?? $payload;

        if (!$table || !$id || empty($data)) {
            return response()->json(['error' => 'Table, ID and data are required'], 400);
        }

        $fullTable = 'cag_new.' . $table;
        unset($data['id']);

        $validColumns = $this->getTableColumns($table);
        $filteredData = array_intersect_key($data, array_flip($validColumns));

        if ($table === 'admin_users') {
            if (!empty($filteredData['password_hash'])) {
                $filteredData['password_hash'] = Hash::make($filteredData['password_hash']);
            } else {
                unset($filteredData['password_hash']);
            }
        }

        if (in_array('updated_at', $validColumns)) {
            $filteredData['updated_at'] = now();
        }

        try {
            DB::table($fullTable)->where('id', $id)->update($filteredData);
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() == '23505') {
                return response()->json([
                    'error' => 'A record with this unique value (such as slug, title, or code) already exists. Please enter a different value.'
                ], 409);
            }
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Audit Log
        AdminAuditLog::create([
            'user_id' => 2,
            'action' => 'UPDATE',
            'table_name' => $table,
            'record_id' => (string) $id,
            'ip_address' => $request->ip(),
            'new_data' => json_encode(['updated_fields' => array_keys($filteredData)]),
            'created_at' => now(),
        ]);

        return response()->json(['success' => true]);
    }

    private function getTableColumns($table)
    {
        $columns = DB::select("
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'cag_new' 
              AND table_name = :table
        ", ['table' => $table]);

        return array_column($columns, 'column_name');
    }

    public function destroy(Request $request)
    {
        $table = $request->query('table');
        $id = $request->query('id');

        if (!$table || !$id) {
            return response()->json(['error' => 'Table and ID are required'], 400);
        }

        $fullTable = 'cag_new.' . $table;

        try {
            DB::table($fullTable)->where('id', $id)->delete();

            // Audit Log
            AdminAuditLog::create([
                'user_id' => 2,
                'action' => 'DELETE',
                'table_name' => $table,
                'record_id' => (string) $id,
                'ip_address' => $request->ip(),
                'old_data' => json_encode(['deleted_id' => $id]),
                'created_at' => now(),
            ]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Cannot delete record: It is referenced by other items in the database.'
            ], 409);
        }
    }
}
