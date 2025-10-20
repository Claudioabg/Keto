
export interface Macros {
    p: number; // protein
    f: number; // fat
    c: number; // carbs
}

export interface Meal {
    nombre: string;
    macros: Macros;
    ingredientes: string[];
    pasos: string;
    performance: boolean; // For workout days
}

export type MealType = 'desayuno' | 'almuerzo' | 'merienda' | 'cena';

export interface DayMeal {
    meal: Meal | null;
    fasting: boolean;
    cheat: boolean;
}

export type DayPlan = {
    [key in MealType]: DayMeal;
};

export type WorkoutLevel = 'descanso' | 'ligero' | 'intermedio' | 'fuerte';

export interface UserProfile {
    age: number;
    height: number;
    weight: number;
    targetWeight: number;
}

export interface DailyLog {
    date: string; // ISO string
    weight: number;
    notes: string;
}
