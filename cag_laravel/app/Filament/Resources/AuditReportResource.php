<?php

namespace App\Filament\Resources;

use App\Models\AuditReport;
use App\Filament\Resources\AuditReportResource\Pages;
use Filament\Schemas\Schema;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AuditReportResource extends Resource
{
    protected static ?string $model = AuditReport::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-document-chart-bar';
    protected static \UnitEnum|string|null $navigationGroup = 'Content Management';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\TextInput::make('title_en')
                    ->label('Title (English)')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('title_hi')
                    ->label('Title (Hindi)')
                    ->maxLength(255),
                Forms\Components\TextInput::make('year_of_report')
                    ->numeric()
                    ->required(),
                Forms\Components\Select::make('government_type_id')
                    ->relationship('governmentType', 'name_en')
                    ->searchable()
                    ->preload(),
                Forms\Components\Select::make('state_id')
                    ->relationship('state', 'name_en')
                    ->searchable()
                    ->preload(),
                Forms\Components\TextInput::make('sector'),
                Forms\Components\TextInput::make('report_type'),
                Forms\Components\FileUpload::make('main_report_file')
                    ->label('Report Document (PDF)')
                    ->directory('audit-reports'),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('year_of_report')
                    ->label('Year')
                    ->sortable(),
                Tables\Columns\TextColumn::make('governmentType.name_en')
                    ->label('Government Level'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAuditReports::route('/'),
            'create' => Pages\CreateAuditReport::route('/create'),
            'edit' => Pages\EditAuditReport::route('/{record}/edit'),
        ];
    }
}
