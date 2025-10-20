
import React, { useState } from 'react';
import { UserProfile } from '../../types';

interface ProfileModalContentProps {
    profile: UserProfile;
    onSave: (newProfile: UserProfile) => void;
}

const ProfileModalContent: React.FC<ProfileModalContentProps> = ({ profile, onSave }) => {
    const [formData, setFormData] = useState<UserProfile>(profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: Number(value) || 0 }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const renderInput = (id: keyof UserProfile, label: string) => (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-cyan-200">{label}</label>
            <input
                type="number"
                id={id}
                name={id}
                // FIX: The value of an input should be a string. Converting the number to a string fixes the type error.
                value={String(formData[id])}
                onChange={handleChange}
                className="bg-black/20 border border-white/30 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            />
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {renderInput('age', 'Edad (años)')}
            {renderInput('height', 'Altura (cm)')}
            {renderInput('weight', 'Peso Actual (kg)')}
            {renderInput('targetWeight', 'Peso Objetivo (kg)')}
            <button type="submit" className="w-full control-btn glass-effect text-white font-bold py-3 px-6 rounded-lg shadow-md">
                Guardar Perfil
            </button>
        </form>
    );
};

export default ProfileModalContent;
