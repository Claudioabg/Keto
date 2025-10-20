
import React, { useState, useEffect } from 'react';
import { DailyLog } from '../../types';

interface DailyLogModalContentProps {
    dayIndex: number;
    log: DailyLog | null;
    onSave: (dayIndex: number, log: DailyLog) => void;
}

const DailyLogModalContent: React.FC<DailyLogModalContentProps> = ({ dayIndex, log, onSave }) => {
    const [currentLog, setCurrentLog] = useState<DailyLog>({
        date: new Date().toISOString(),
        weight: 0,
        notes: ''
    });

    useEffect(() => {
        if (log) {
            setCurrentLog(log);
        } else {
            setCurrentLog({ date: new Date().toISOString(), weight: 0, notes: '' });
        }
    }, [log]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentLog(prev => ({ ...prev, [name]: name === 'weight' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(dayIndex, currentLog);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-cyan-200">Peso de Hoy (kg)</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    step="0.1"
                    value={currentLog.weight || ''}
                    onChange={handleChange}
                    className="bg-black/20 border border-white/30 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                    placeholder="Ej: 79.5"
                />
            </div>
            <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-cyan-200">Notas del día</label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={currentLog.notes}
                    onChange={handleChange}
                    className="bg-black/20 border border-white/30 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                    placeholder="¿Cómo te sentiste? ¿Niveles de energía? ¿Antojos?"
                />
            </div>
            <button type="submit" className="w-full control-btn glass-effect text-white font-bold py-3 px-6 rounded-lg shadow-md">
                Guardar Registro
            </button>
        </form>
    );
};

export default DailyLogModalContent;
