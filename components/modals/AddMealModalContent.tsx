
import React, { useState } from 'react';
import { Meal, MealType, Macros } from '../../types';
import { mealOrderMap } from '../../data/defaultData';

interface AddMealModalContentProps {
    onSave: (mealType: MealType, newMeal: Meal) => void;
}

const initialMealState: Omit<Meal, 'nombre'> & { nombre: string } = {
    nombre: '',
    macros: { p: 0, f: 0, c: 0 },
    ingredientes: [],
    pasos: '',
    performance: false,
};

const AddMealModalContent: React.FC<AddMealModalContentProps> = ({ onSave }) => {
    const [mealType, setMealType] = useState<MealType>('almuerzo');
    const [meal, setMeal] = useState(initialMealState);

    const handleMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
            // FIX: TypeScript was not preserving the narrowed type of `e.target` inside the callback.
            // By storing `e.target.checked` in a variable, we ensure the correct type is inferred.
            const checked = e.target.checked;
            setMeal(prev => ({...prev, [name]: checked}));
        } else {
            setMeal(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleMacroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMeal(prev => ({ ...prev, macros: { ...prev.macros, [name]: Number(value) || 0 } }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMeal: Meal = {
            ...meal,
            ingredientes: meal.ingredientes.toString().split(',').map(i => i.trim()).filter(Boolean),
        };
        onSave(mealType, newMeal);
        setMeal(initialMealState);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium text-cyan-200">Tipo de Comida</label>
                <select value={mealType} onChange={e => setMealType(e.target.value as MealType)} className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5">
                    {mealOrderMap.map(type => <option key={type} value={type} className="capitalize bg-gray-800">{type}</option>)}
                </select>
            </div>
            <input type="text" name="nombre" placeholder="Nombre de la Comida" value={meal.nombre} onChange={handleMealChange} required className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5" />
            <textarea name="ingredientes" placeholder="Ingredientes (separados por coma)" value={meal.ingredientes} onChange={handleMealChange} className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5" />
            <textarea name="pasos" placeholder="Pasos de preparación" value={meal.pasos} onChange={handleMealChange} className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5" />
            <div className="grid grid-cols-3 gap-2">
                <input type="number" name="p" placeholder="Proteínas (g)" value={meal.macros.p} onChange={handleMacroChange} className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5" />
                <input type="number" name="f" placeholder="Grasas (g)" value={meal.macros.f} onChange={handleMacroChange} className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5" />
                <input type="number" name="c" placeholder="Carbs (g)" value={meal.macros.c} onChange={handleMacroChange} className="bg-black/20 border border-white/30 text-white text-sm rounded-lg block w-full p-2.5" />
            </div>
             <div className="flex items-center">
                <input id="performance-checkbox" type="checkbox" name="performance" checked={meal.performance} onChange={handleMealChange} className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-600 ring-offset-gray-800 focus:ring-2"/>
                <label htmlFor="performance-checkbox" className="ml-2 text-sm font-medium text-gray-300">Comida de Alto Rendimiento (para días de entreno)</label>
            </div>
            <button type="submit" className="w-full control-btn glass-effect text-white font-bold py-3 px-6 rounded-lg shadow-md">Añadir Comida</button>
        </form>
    );
};

export default AddMealModalContent;
