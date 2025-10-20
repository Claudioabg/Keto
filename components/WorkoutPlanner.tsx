
import React from 'react';
import { WorkoutLevel } from '../types';
import { weekDays } from '../data/defaultData';

interface WorkoutPlannerProps {
    schedule: WorkoutLevel[];
    onUpdateSchedule: (newSchedule: WorkoutLevel[]) => void;
}

const WorkoutPlanner: React.FC<WorkoutPlannerProps> = ({ schedule, onUpdateSchedule }) => {
    const icons: Record<WorkoutLevel, string> = { descanso: '🛌', ligero: '🏃‍♂️', intermedio: '🏋️‍♂️', fuerte: '🔥' };
    const titles: Record<WorkoutLevel, string> = { descanso: 'Reposo', ligero: 'Ligero', intermedio: 'Intermedio', fuerte: 'Fuerte' };
    const levels: WorkoutLevel[] = ['descanso', 'ligero', 'intermedio', 'fuerte'];

    const handleDayClick = (index: number) => {
        const currentLevel = schedule[index];
        const nextLevelIndex = (levels.indexOf(currentLevel) + 1) % levels.length;
        const newSchedule = [...schedule];
        newSchedule[index] = levels[nextLevelIndex];
        onUpdateSchedule(newSchedule);
    };

    return (
        <div className="glass-effect rounded-xl shadow-lg p-4 mb-8 no-print">
            <h3 className="text-xl font-bold text-center text-cyan-200 mb-4">Mi Semana Deportiva</h3>
            <div className="grid grid-cols-7 gap-2 text-center">
                {schedule.map((level, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center cursor-pointer p-1 rounded-md hover:bg-white/10 transition-colors"
                        onClick={() => handleDayClick(index)}
                    >
                        <span className="text-sm text-cyan-200">{weekDays[index].substring(0, 3)}</span>
                        <span className="text-2xl mt-1 text-white/85">{icons[level]}</span>
                        <span className="text-xs text-blue-200">{titles[level]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutPlanner;