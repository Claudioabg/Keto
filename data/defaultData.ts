
import { Meal, DayPlan, WorkoutLevel, MealType, UserProfile, DailyLog } from '../types';

export const weekDays: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const mealOrderMap: MealType[] = ['desayuno', 'almuerzo', 'merienda', 'cena'];

// Some default meals to populate the plan initially
export const defaultMeals: Meal[] = [
    {
        nombre: "Revoltillo de Huevos con Chorizo",
        macros: { p: 25, f: 30, c: 5 },
        ingredientes: ["3 huevos", "50g de chorizo paraguayo", "1/4 de cebolla", "Sal y pimienta al gusto"],
        pasos: "Picar la cebolla y sofreír con el chorizo. Batir los huevos y agregarlos a la sartén. Cocinar hasta que estén listos.",
        performance: true,
    },
    {
        nombre: "Bife Koygua",
        macros: { p: 40, f: 35, c: 8 },
        ingredientes: ["200g de carne de res (nalga)", "1 huevo", "1/2 tomate", "1/4 de cebolla", "Especias al gusto"],
        pasos: "Sellar la carne en una sartén. En la misma sartén, sofreír la cebolla y el tomate. Agregar agua y cocinar a fuego lento. Servir con un huevo frito encima.",
        performance: true,
    },
    {
        nombre: "Chipa So'o Keto",
        macros: { p: 15, f: 20, c: 6 },
        ingredientes: ["100g de harina de almendras", "50g de queso Paraguay", "1 huevo", "25g de carne molida cocida"],
        pasos: "Mezclar la harina, el queso y el huevo para formar una masa. Rellenar con la carne molida. Hornear a 180°C por 20 minutos.",
        performance: false,
    },
    {
        nombre: "Ensalada de Aguacate y Pollo",
        macros: { p: 35, f: 25, c: 7 },
        ingredientes: ["150g de pechuga de pollo cocida y desmenuzada", "1 aguacate", "Lechuga", "Tomate cherry", "Aderezo de limón y aceite de oliva"],
        pasos: "Mezclar todos los ingredientes en un bol y servir frío.",
        performance: false,

    },
    {
        nombre: "Caldo de Pescado",
        macros: { p: 30, f: 15, c: 5 },
        ingredientes: ["200g de filete de pescado (tilapia o similar)", "Verduras varias (zapallo, cebolla, locote)", "Caldo de verduras", "Queso Paraguay"],
        pasos: "Hervir las verduras en el caldo. Agregar el pescado y cocinar por 10 minutos. Servir caliente con trocitos de queso Paraguay.",
        performance: false,
    },
];

export const defaultWorkoutSchedule: WorkoutLevel[] = ['ligero', 'intermedio', 'descanso', 'fuerte', 'ligero', 'descanso', 'descanso'];

export const defaultProfile: UserProfile = {
    age: 30,
    height: 175,
    weight: 80,
    targetWeight: 75,
};

export const defaultDailyLogs: { [key: string]: DailyLog } = {}; // Key is dayIndex

export const createEmptyPlan = (): DayPlan[] => {
    return Array(7).fill(null).map(() => ({
        desayuno: { meal: null, fasting: false, cheat: false },
        almuerzo: { meal: null, fasting: false, cheat: false },
        merienda: { meal: null, fasting: false, cheat: false },
        cena: { meal: null, fasting: false, cheat: false },
    }));
};
