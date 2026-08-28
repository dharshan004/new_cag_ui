<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminUploadController extends Controller
{
    public function upload(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['error' => 'No file provided'], 400);
        }

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());

        $imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
        $docExtensions = ['pdf', 'docx', 'xlsx', 'zip'];
        $allowedExtensions = array_merge($imageExtensions, $docExtensions);

        if (!in_array($extension, $allowedExtensions)) {
            return response()->json([
                'error' => 'Invalid file extension. Allowed formats: PDF, DOCX, XLSX, ZIP, PNG, JPG, WEBP.'
            ], 400);
        }

        $folder = in_array($extension, $imageExtensions) ? 'images' : 'uploads';
        $filename = time() . '_' . Str::random(10) . '.' . $extension;

        // Store file in public disk
        $path = $file->storeAs("admin-uploads/{$folder}", $filename, 'public');
        $url = "/storage/{$path}";

        return response()->json([
            'url' => $url,
            'name' => $file->getClientOriginalName(),
            'size' => $file->getSize()
        ]);
    }
}
