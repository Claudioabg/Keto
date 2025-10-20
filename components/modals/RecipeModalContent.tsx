
import React from 'react';
import { Meal } from '../../types';

interface RecipeModalContentProps {
    meal: Meal;
}

const RecipeModalContent: React.FC<RecipeModalContentProps> = ({ meal }) => {
    return (
        <div>
            <div className="mb-4">
                <h4 className="text-lg font-bold mb-2 text-cyan-300">Ingredientes:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {(meal.ingredientes || []).map((i, index) => <li key={index}>{i}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-2 text-cyan-300">Preparación:</h4>
                <p className="whitespace-pre-line">{meal.pasos || ''}</p>
            </div>
        </div>
    );
};

export default RecipeModalContent;
