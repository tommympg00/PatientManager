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
            'email' => [
                'required',
                'email',
                'unique:patients,email',
                'regex:/^[\w\.-]+@gmail\.com$/',
            ],
            'phone_number' => [
                'required',
                'string',
                'max:20',
                'regex:/^\+\d{1,3}\d{7,14}$/',
                function ($attribute, $value, $fail) {
                    if (preg_match('/^\+\d{1,3}0/', $value)) {
                        $fail('Phone number should not start with 0 after the country code.');
                    }
                }
            ],
            'document_photo' => 'required|mimes:jpg,jpeg|max:2048',
        ]);

        $documentPhoto = $request->file('document_photo');
        $documentPhotoUrl = $this->storageService->store($documentPhoto, 'patient-documents');

        $patient = Patient::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'document_photo_path' => $documentPhotoUrl,
        ]);

        $patient->notify(new PatientRegisteredNotification($patient));

        return response()->json(['success' => 'Patient registered successfully.', 'data' => $patient], 201);
    }
    public function show(Patient $patient)
    {
        return response()->json(['success' => 'Patients fetched succesfully', 'data' => $patient]);
    }
    public function index()
    {
        return response()->json(['success' => 'Patients fetched succesfully.', 'data' => Patient::all()]);
    }
}
