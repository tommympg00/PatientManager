<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Patient;
use App\Notifications\PatientRegisteredNotification;
use App\Services\StorageService;

class PatientController extends Controller
{
    protected $storageService;

    public function __construct(StorageService $storageService)
    {
        $this->storageService = $storageService;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone_number' => 'required|string|max:20',
            'document_photo' => 'required|mimes:jpg,jpeg|max:2048',
        ]);

        $document = $request->file('document_photo');
        $document_photo_url = $this->storageService->store($document, 'patient-documents');

        $patient = Patient::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'document_photo_path' => $document_photo_url,
        ]);

        $patient->notify(new PatientRegisteredNotification($patient));

        return response()->json(['message' => 'Patient registered successfully.', 'data' => $patient], 201);
    }
    public function show(Patient $patient)
    {
        return response()->json($patient);
    }
    public function index()
    {
        return response()->json(Patient::all());
    }
}
