<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        $path = $request->file('document_photo')->store('documents', 'public');
        $downloadUrl = asset('storage/' . $path);

        $patient = Patient::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'document_photo_path' => $downloadUrl,
        ]);

        Mail::to($patient->email)->queue(new \App\Mail\PatientRegistered($patient));

        return response()->json(['message' => 'Patient registered successfully.'], 201);
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
