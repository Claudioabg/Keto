
import React from 'react';
import { DayPlan, Meal, MealType, WorkoutLevel } from '../types';
import DayColumn from './DayColumn';

interface WeeklyPlanProps {
    plan: DayPlan[];
    workoutSchedule: WorkoutLevel[];
    onShowRecipe: (meal: Meal) => void;
    onSwapMeal: (dayIndex: number, mealType: MealType) => void;
    onShowMacros: (dayIndex: number) => void;
    onToggleFasting: (dayIndex: number, mealType: MealType) => void;
    onToggleCheat: (dayIndex: number, mealType: MealType) => void;
    onShowLog: (dayIndex: number) => void;
}

const WeeklyPlan: React.FC<WeeklyPlanProps> = (props) => {
    if (!props.plan || props.plan.length === 0) {
        return (
            <div className="text-center p-8 glass-effect rounded-lg">
                <p className="text-xl text-white">Genera un plan para comenzar.</p>
            </div>
        );
    }
    return (
        <div className="weekly-plan-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {props.plan.map((day, index) => (
                <DayColumn
                    key={index}
                    dayData={day}
                    dayIndex={index}
                    workoutLevel={props.workoutSchedule[index]}
                    onShowRecipe={props.onShowRecipe}
                    onSwapMeal={props.onSwapMeal}
                    onShowMacros={props.onShowMacros}
                    onToggleFasting={props.onToggleFasting}
                    onToggleCheat={props.onToggleCheat}
                    onShowLog={props.onShowLog}
                />
            ))}
        </div>
    );
};

export default WeeklyPlan;
