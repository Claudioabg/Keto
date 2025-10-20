
import React, { useState } from 'react';
import { Meal, MealType } from '../../types';
import { findRecipeByIngredients } from '../../services/geminiService';

interface IngredientFinderModalContentProps {
    onAddMeal: (mealType: MealType, newMeal: Meal) => void;
}

const IngredientFinderModalContent: React.FC<IngredientFinderModalContentProps> = ({ onAddMeal }) => {
    const [ingredients, setIngredients] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedMeal, setGeneratedMeal] = useState<Meal | null>(null);

    const handleGenerate = async () => {
        if (!ingredients.trim()) {
            setError('Por favor, introduce algunos ingredientes.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedMeal(null);
        try {
            const meal = await findRecipeByIngredients(ingredients);
            setGeneratedMeal(meal);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMeal = (type: MealType) => {
        if (generatedMeal) {
            onAddMeal(type, generatedMeal);
            setGeneratedMeal(null);
            setIngredients('');
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-400">
                Escribe los ingredientes que tienes a mano (ej: huevos, queso, chorizo) y la IA creará una receta keto para ti.
            </p>
            <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={3}
                className="bg-black/20 border border-white/30 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                placeholder="Ej: pollo, aguacate, tomate, cebolla..."
            />
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full control-btn glass-effect text-white font-bold py-3 px-6 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Pensando...' : '🍳 Generar Receta'}
            </button>

            {error && <p className="text-red-400 text-center">{error}</p>}

            {generatedMeal && (
                <div className="mt-6 p-4 border border-cyan-500/50 rounded-lg bg-black/20">
                    <h3 className="text-xl font-bold text-cyan-300">{generatedMeal.nombre}</h3>
                    <div className="my-4">
                        <h4 className="font-semibold text-cyan-400">Ingredientes:</h4>
                        <ul className="list-disc list-inside text-sm">
                            {generatedMeal.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                    </div>
                    <div className="my-4">
                        <h4 className="font-semibold text-cyan-400">Pasos:</h4>
                        <p className="whitespace-pre-wrap text-sm">{generatedMeal.pasos}</p>
                    </div>
                    <div className="my-4 text-xs flex justify-around">
                        <span>P: {generatedMeal.macros.p}g</span>
                        <span>G: {generatedMeal.macros.f}g</span>
                        <span>C: {generatedMeal.macros.c}g</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button onClick={() => handleAddMeal('almuerzo')} className="flex-1 control-btn glass-effect text-sm py-2 px-3 rounded-md">Guardar como Almuerzo</button>
                        <button onClick={() => handleAddMeal('cena')} className="flex-1 control-btn glass-effect text-sm py-2 px-3 rounded-md">Guardar como Cena</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientFinderModalContent;
