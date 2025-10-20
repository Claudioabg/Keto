
import React from 'react';
import { DayPlan } from '../../types';

interface SavedWeeksModalContentProps {
    savedWeeks: { [key: string]: DayPlan[] };
    onLoad: (plan: DayPlan[]) => void;
    onDelete: (key: string) => void;
}

const SavedWeeksModalContent: React.FC<SavedWeeksModalContentProps> = ({ savedWeeks, onLoad, onDelete }) => {
    const keys = Object.keys(savedWeeks);

    if (keys.length === 0) {
        return <p>No tienes ninguna semana guardada todavía.</p>;
    }

    return (
        <div className="space-y-3">
            {keys.map(key => (
                <div key={key} className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                    <span className="text-white">{new Date(key).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <div className="flex gap-2">
                        <button onClick={() => onLoad(savedWeeks[key])} className="control-btn glass-effect text-sm py-1 px-3 rounded-md">Cargar</button>
                        <button onClick={() => onDelete(key)} className="control-btn bg-red-800/50 hover:bg-red-700/50 text-sm py-1 px-3 rounded-md">Borrar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SavedWeeksModalContent;
