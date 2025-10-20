
import React from 'react';
import { Meal, MealType } from '../types';

interface MealCardProps {
    meal: Meal | null;
    mealType: MealType;
    dayIndex: number;
    isFasting: boolean;
    isCheat: boolean;
    onShowRecipe: (meal: Meal) => void;
    onSwapMeal: (dayIndex: number, mealType: MealType) => void;
    onToggleFasting: () => void;
    onToggleCheat: () => void;
}

const MealCard: React.FC<MealCardProps> = ({
    meal,
    mealType,
    dayIndex,
    isFasting,
    isCheat,
    onShowRecipe,
    onSwapMeal,
    onToggleFasting,
    onToggleCheat,
}) => {
    const mealTypeName = mealType.charAt(0).toUpperCase() + mealType.slice(1);

    if (isFasting) {
        return (
            <div className="meal-card fasting bg-black/30 p-3 rounded-lg text-center h-full flex flex-col justify-center">
                <p className="text-sm text-cyan-300">AYUNO</p>
                <button onClick={onToggleFasting} className="text-xs text-gray-400 hover:text-white mt-1">Cancelar</button>
            </div>
        );
    }

    if (isCheat) {
        return (
            <div className="meal-card cheat bg-yellow-800/30 p-3 rounded-lg text-center h-full flex flex-col justify-center">
                <p className="text-sm text-yellow-300">PERMITIDO</p>
                <button onClick={onToggleCheat} className="text-xs text-gray-400 hover:text-white mt-1">Cancelar</button>
            </div>
        );
    }
    
    if (!meal) {
        return (
            <div className="meal-card empty bg-black/20 p-3 rounded-lg text-center h-full flex flex-col justify-center">
                <p className="text-sm text-gray-500 capitalize">{mealTypeName}</p>
                <button onClick={() => onSwapMeal(dayIndex, mealType)} className="text-xs text-cyan-400 hover:text-cyan-200 mt-1">Asignar</button>
            </div>
        );
    }

    return (
        <div className="meal-card bg-black/40 p-3 rounded-lg h-full flex flex-col">
            <h5 className="font-bold text-sm text-white capitalize">{mealTypeName}</h5>
            <p className="text-xs text-gray-300 flex-grow">{meal.nombre}</p>
            <div className="flex justify-between items-center mt-2 text-xs">
                <button onClick={() => onShowRecipe(meal)} className="text-cyan-400 hover:text-cyan-200">Ver</button>
                <button onClick={() => onSwapMeal(dayIndex, mealType)} className="text-blue-400 hover:text-blue-200">Cambiar</button>
            </div>
        </div>
    );
};

export default MealCard;
