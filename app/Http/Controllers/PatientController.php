<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PatientController extends Controller
{
    public function store(Request $request)
    {   
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone_number' => 'required|string|max:20',
            'document_photo' => 'required|mimes:jpg,jpeg|max:2048',
        ]);

        $document = $request->file('document_photo');
        $path = Storage::disk('s3')->put('patient-documents', $document);
        $document_photo_url = Storage::disk('s3')->url($path);

        $patient = Patient::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'document_photo_path' => $document_photo_url,
        ]);

        Mail::to($patient->email)->queue(new \App\Mail\PatientRegistered($patient));

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
