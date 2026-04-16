<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Formatear datos antes de validar. 
     * Pone siempre la primera en mayuscula y las demás minusculas
     */
    protected function prepareForValidation(): void
    {
        if ($this->name) {
            $this->merge([
                'name' => ucfirst(strtolower($this->name)),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'     => 'required|alpha|max:15|unique:users',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'El nombre de personaje es obligatorio.',
            'name.alpha'     => 'El nombre solo puede contener letras, sin espacios ni números.',
            'name.max'       => 'El nombre no puede superar los 15 caracteres.',
            'name.unique'    => 'El nombre de personaje ya está en uso.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email'    => 'El formato del correo electrónico no es válido.',
            'email.unique'   => 'El correo electrónico ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min'      => 'La contraseña debe tener al menos 8 caracteres.',
        ];
    }
}
