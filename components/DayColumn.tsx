
import React from 'react';
import { DayPlan, Meal, MealType, WorkoutLevel } from '../types';
import { weekDays, mealOrderMap } from '../data/defaultData';
import MealCard from './MealCard';

interface DayColumnProps {
    dayData: DayPlan;
    dayIndex: number;
    workoutLevel: WorkoutLevel;
    onShowRecipe: (meal: Meal) => void;
    onSwapMeal: (dayIndex: number, mealType: MealType) => void;
    onShowMacros: (dayIndex: number) => void;
    onToggleFasting: (dayIndex: number, mealType: MealType) => void;
    onToggleCheat: (dayIndex: number, mealType: MealType) => void;
    onShowLog: (dayIndex: number) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({
    dayData,
    dayIndex,
    workoutLevel,
    onShowRecipe,
    onSwapMeal,
    onShowMacros,
    onToggleFasting,
    onToggleCheat,
    onShowLog,
}) => {
    const workoutIcons: Record<WorkoutLevel, string> = { descanso: '🛌', ligero: '🏃‍♂️', intermedio: '🏋️‍♂️', fuerte: '🔥' };

    return (
        <div className="day-column glass-effect rounded-lg p-3 flex flex-col gap-2">
            <div className="text-center mb-2">
                <h4 className="font-bold text-white">{weekDays[dayIndex]}</h4>
                <p className="text-2xl">{workoutIcons[workoutLevel]}</p>
            </div>
            <div className="flex-grow flex flex-col gap-2">
                {mealOrderMap.map(mealType => (
                    <MealCard
                        key={mealType}
                        meal={dayData[mealType].meal}
                        mealType={mealType}
                        dayIndex={dayIndex}
                        isFasting={dayData[mealType].fasting}
                        isCheat={dayData[mealType].cheat}
                        onShowRecipe={onShowRecipe}
                        onSwapMeal={onSwapMeal}
                        onToggleFasting={() => onToggleFasting(dayIndex, mealType)}
                        onToggleCheat={() => onToggleCheat(dayIndex, mealType)}
                    />
                ))}
            </div>
            <div className="mt-2 flex flex-col gap-2 text-sm">
                <button onClick={() => onShowMacros(dayIndex)} className="w-full control-btn-sm glass-effect">Macros</button>
                <button onClick={() => onShowLog(dayIndex)} className="w-full control-btn-sm glass-effect">Registro</button>
            </div>
        </div>
    );
};

export default DayColumn;
