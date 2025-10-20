
import React from 'react';

interface ControlsProps {
    onGenerate: () => void;
    onSave: () => void;
    onLoad: () => void;
    onPrint: () => void;
    onOpenProfile: () => void;
    onOpenAddMeal: () => void;
    onOpenFinder: () => void;
    onOpenProgress: () => void;
}

const Controls: React.FC<ControlsProps> = (props) => {
    return (
        <div className="controls-container grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8 no-print">
            <button onClick={props.onGenerate} className="control-btn glass-effect">🧬 Generar</button>
            <button onClick={props.onSave} className="control-btn glass-effect">💾 Guardar</button>
            <button onClick={props.onLoad} className="control-btn glass-effect">📂 Cargar</button>
            <button onClick={props.onOpenProfile} className="control-btn glass-effect">👤 Perfil</button>
            <button onClick={props.onOpenAddMeal} className="control-btn glass-effect">➕ Añadir Comida</button>
            <button onClick={props.onOpenFinder} className="control-btn glass-effect">🍳 Buscar Receta</button>
            <button onClick={props.onOpenProgress} className="control-btn glass-effect">📈 Progreso</button>
            <button onClick={props.onPrint} className="control-btn glass-effect">🖨️ Imprimir</button>
        </div>
    );
};

export default Controls;
