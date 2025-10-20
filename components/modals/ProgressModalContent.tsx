
import React from 'react';
import { DailyLog, UserProfile } from '../../types';

interface ProgressModalContentProps {
    logs: { [key: string]: DailyLog }; // key is dayIndex
    profile: UserProfile;
}

const ProgressModalContent: React.FC<ProgressModalContentProps> = ({ logs, profile }) => {
    const sortedLogs = Object.values(logs)
        .filter(log => log && log.weight > 0)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (sortedLogs.length === 0) {
        return <p>Aún no has registrado tu peso. ¡Empieza a registrar para ver tu progreso!</p>;
    }

    const startWeight = profile.weight;
    const currentWeight = sortedLogs[sortedLogs.length - 1].weight;
    const targetWeight = profile.targetWeight;
    const totalLost = startWeight - currentWeight;
    const toGo = currentWeight - targetWeight;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="glass-effect p-3 rounded-lg">
                    <p className="text-2xl font-bold text-cyan-300">{startWeight.toFixed(1)} <span className="text-sm">kg</span></p>
                    <p className="text-xs text-gray-400">Peso Inicial</p>
                </div>
                <div className="glass-effect p-3 rounded-lg">
                    <p className="text-2xl font-bold text-cyan-300">{currentWeight.toFixed(1)} <span className="text-sm">kg</span></p>
                    <p className="text-xs text-gray-400">Peso Actual</p>
                </div>
                <div className="glass-effect p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{totalLost.toFixed(1)} <span className="text-sm">kg</span></p>
                    <p className="text-xs text-gray-400">Total Perdido</p>
                </div>
                 <div className="glass-effect p-3 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">{toGo > 0 ? toGo.toFixed(1) : 0} <span className="text-sm">kg</span></p>
                    <p className="text-xs text-gray-400">Para el Objetivo</p>
                </div>
            </div>
            
            <div>
                <h4 className="text-lg font-bold text-cyan-300 mb-2">Historial de Peso</h4>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                    {sortedLogs.map(log => (
                        <div key={log.date} className="flex justify-between items-center bg-black/20 p-2 rounded-md text-sm">
                            <span className="text-gray-300">{new Date(log.date).toLocaleDateString('es-ES')}</span>
                            <span className="font-semibold text-white">{log.weight.toFixed(1)} kg</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* TODO: Add a chart here for better visualization */}
        </div>
    );
};

export default ProgressModalContent;
