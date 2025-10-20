
import React from 'react';
import { DayPlan, Macros, MealType } from '../../types';
import { mealOrderMap } from '../../data/defaultData';

interface MacroModalContentProps {
    dayPlan: DayPlan;
}

const MacroModalContent: React.FC<MacroModalContentProps> = ({ dayPlan }) => {
    const totalMacros: Macros = mealOrderMap.reduce((acc, mealType) => {
        const meal = dayPlan[mealType].meal;
        if (meal && !dayPlan[mealType].fasting && !dayPlan[mealType].cheat) {
            acc.p += meal.macros.p;
            acc.f += meal.macros.f;
            acc.c += meal.macros.c;
        }
        return acc;
    }, { p: 0, f: 0, c: 0 });

    const totalCalories = (totalMacros.p * 4) + (totalMacros.f * 9) + (totalMacros.c * 4);

    return (
        <div className="text-white">
            <div className="mb-6">
                <h4 className="text-xl font-bold text-center text-cyan-300 mb-4">Total del Día</h4>
                <div className="grid grid-cols-4 text-center gap-2">
                    <div>
                        <p className="font-bold text-lg">{Math.round(totalCalories)}</p>
                        <p className="text-xs text-gray-400">Calorías</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">{totalMacros.p}g</p>
                        <p className="text-xs text-gray-400">Proteínas</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">{totalMacros.f}g</p>
                        <p className="text-xs text-gray-400">Grasas</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">{totalMacros.c}g</p>
                        <p className="text-xs text-gray-400">Carbs Netos</p>
                    </div>
                </div>
            </div>

            <h4 className="text-lg font-bold text-cyan-300 mb-2">Detalle por Comida</h4>
            <div className="space-y-2">
                {mealOrderMap.map(mealType => {
                    const meal = dayPlan[mealType].meal;
                    const mealName = mealType.charAt(0).toUpperCase() + mealType.slice(1);
                    if (dayPlan[mealType].fasting) {
                        return (
                            <div key={mealType} className="p-2 bg-black/20 rounded-md text-sm text-gray-400">{mealName}: Ayuno</div>
                        );
                    }
                    if (dayPlan[mealType].cheat) {
                        return (
                            <div key={mealType} className="p-2 bg-black/20 rounded-md text-sm text-yellow-400">{mealName}: Permitido</div>
                        );
                    }
                    if (!meal) {
                         return (
                            <div key={mealType} className="p-2 bg-black/20 rounded-md text-sm text-gray-500">{mealName}: -</div>
                        );
                    }
                    return (
                        <div key={mealType} className="p-3 bg-black/20 rounded-md">
                            <p className="font-semibold">{mealName}: <span className="font-normal text-gray-300">{meal.nombre}</span></p>
                            <div className="text-xs text-gray-400 mt-1 grid grid-cols-3">
                                <span>P: {meal.macros.p}g</span>
                                <span>G: {meal.macros.f}g</span>
                                <span>C: {meal.macros.c}g</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MacroModalContent;
