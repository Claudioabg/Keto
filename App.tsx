
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import WeeklyPlan from './components/WeeklyPlan';
import WorkoutPlanner from './components/WorkoutPlanner';
import Modal from './components/Modal';
import RecipeModalContent from './components/modals/RecipeModalContent';
import MacroModalContent from './components/modals/MacroModalContent';
import ProfileModalContent from './components/modals/ProfileModalContent';
import AddMealModalContent from './components/modals/AddMealModalContent';
import SavedWeeksModalContent from './components/modals/SavedWeeksModalContent';
import IngredientFinderModalContent from './components/modals/IngredientFinderModalContent';
import DailyLogModalContent from './components/modals/DailyLogModalContent';
import ProgressModalContent from './components/modals/ProgressModalContent';
import useLocalStorage from './hooks/useLocalStorage';
import { DayPlan, Meal, MealType, WorkoutLevel, UserProfile, DailyLog } from './types';
import { defaultMeals, defaultWorkoutSchedule, defaultProfile, createEmptyPlan, defaultDailyLogs, weekDays } from './data/defaultData';

type ModalContent = 'recipe' | 'macros' | 'profile' | 'addMeal' | 'loadWeek' | 'finder' | 'log' | 'progress' | null;

const App: React.FC = () => {
    const [plan, setPlan] = useLocalStorage<DayPlan[]>('ketoPlan', []);
    const [workoutSchedule, setWorkoutSchedule] = useLocalStorage<WorkoutLevel[]>('workoutSchedule', defaultWorkoutSchedule);
    const [userMeals, setUserMeals] = useLocalStorage<Meal[]>('userMeals', []);
    const [profile, setProfile] = useLocalStorage<UserProfile>('userProfile', defaultProfile);
    const [savedWeeks, setSavedWeeks] = useLocalStorage<{ [key: string]: DayPlan[] }>('savedWeeks', {});
    const [dailyLogs, setDailyLogs] = useLocalStorage<{ [key: string]: DailyLog }>('dailyLogs', defaultDailyLogs);

    const [activeModal, setActiveModal] = useState<ModalContent>(null);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

    const allMeals = [...defaultMeals, ...userMeals];

    const generatePlan = useCallback(() => {
        const newPlan = createEmptyPlan();
        const performanceMeals = allMeals.filter(m => m.performance);
        const regularMeals = allMeals.filter(m => !m.performance);

        newPlan.forEach((day, dayIndex) => {
            const isWorkoutDay = workoutSchedule[dayIndex] !== 'descanso';
            const availableMeals = isWorkoutDay ? (performanceMeals.length > 0 ? performanceMeals : allMeals) : (regularMeals.length > 0 ? regularMeals : allMeals);

            if(availableMeals.length === 0) return;

            day.almuerzo.meal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
            day.cena.meal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
        });

        setPlan(newPlan);
    }, [allMeals, workoutSchedule, setPlan]);
    
    const handleShowRecipe = (meal: Meal) => {
        setSelectedMeal(meal);
        setActiveModal('recipe');
    };

    const handleSwapMeal = (dayIndex: number, mealType: MealType) => {
        const isWorkoutDay = workoutSchedule[dayIndex] !== 'descanso';
        const availableMeals = allMeals.filter(m => (isWorkoutDay ? true : !m.performance));
        const mealPool = availableMeals.length > 0 ? availableMeals : allMeals;
        if(mealPool.length === 0) {
            alert("No hay comidas para asignar. Añade una comida primero.");
            return;
        }
        
        const newMeal = mealPool[Math.floor(Math.random() * mealPool.length)];
        const newPlan = [...plan];
        newPlan[dayIndex][mealType].meal = newMeal;
        setPlan(newPlan);
    };

    const handleShowMacros = (dayIndex: number) => {
        setSelectedDayIndex(dayIndex);
        setActiveModal('macros');
    };

    const handleToggleFasting = (dayIndex: number, mealType: MealType) => {
        const newPlan = [...plan];
        newPlan[dayIndex][mealType].fasting = !newPlan[dayIndex][mealType].fasting;
        if (newPlan[dayIndex][mealType].fasting) {
            newPlan[dayIndex][mealType].meal = null;
        }
        setPlan(newPlan);
    };

    const handleToggleCheat = (dayIndex: number, mealType: MealType) => {
        const newPlan = [...plan];
        newPlan[dayIndex][mealType].cheat = !newPlan[dayIndex][mealType].cheat;
        if (newPlan[dayIndex][mealType].cheat) {
            newPlan[dayIndex][mealType].meal = null;
        }
        setPlan(newPlan);
    };

    const handleSaveProfile = (newProfile: UserProfile) => {
        setProfile(newProfile);
        setActiveModal(null);
    };
    
    const handleAddMeal = (mealType: MealType, newMeal: Meal) => {
        setUserMeals(prev => [...prev, newMeal]);
        setActiveModal(null);
        alert(`¡"${newMeal.nombre}" añadido a tus comidas!`);
    };

    const handleSaveWeek = () => {
        if(plan.length === 0) {
            alert("No hay ningún plan que guardar.");
            return;
        }
        const key = new Date().toISOString();
        setSavedWeeks(prev => ({...prev, [key]: plan}));
        alert("Semana guardada con éxito!");
    };

    const handleLoadWeek = (loadedPlan: DayPlan[]) => {
        setPlan(loadedPlan);
        setActiveModal(null);
    };

    const handleDeleteWeek = (key: string) => {
        const newSavedWeeks = {...savedWeeks};
        delete newSavedWeeks[key];
        setSavedWeeks(newSavedWeeks);
    };

    const handleShowLog = (dayIndex: number) => {
        setSelectedDayIndex(dayIndex);
        setActiveModal('log');
    };
    
    const handleSaveLog = (dayIndex: number, log: DailyLog) => {
        setDailyLogs(prev => ({ ...prev, [dayIndex]: log }));
        setActiveModal(null);
    };

    const getModalContent = () => {
        switch(activeModal) {
            case 'recipe':
                return selectedMeal && <RecipeModalContent meal={selectedMeal} />;
            case 'macros':
                return selectedDayIndex !== null && plan[selectedDayIndex] && <MacroModalContent dayPlan={plan[selectedDayIndex]} />;
            case 'profile':
                return <ProfileModalContent profile={profile} onSave={handleSaveProfile} />;
            case 'addMeal':
                return <AddMealModalContent onSave={handleAddMeal} />;
            case 'loadWeek':
                return <SavedWeeksModalContent savedWeeks={savedWeeks} onLoad={handleLoadWeek} onDelete={handleDeleteWeek} />;
            case 'finder':
                return <IngredientFinderModalContent onAddMeal={handleAddMeal} />;
            case 'log':
                return selectedDayIndex !== null && <DailyLogModalContent dayIndex={selectedDayIndex} log={dailyLogs[selectedDayIndex] || null} onSave={handleSaveLog} />;
            case 'progress':
                return <ProgressModalContent logs={dailyLogs} profile={profile} />;
            default:
                return null;
        }
    };
    
    const getModalTitle = () => {
        switch(activeModal) {
            case 'recipe': return selectedMeal?.nombre || 'Receta';
            case 'macros': return selectedDayIndex !== null ? `Macros del ${weekDays[selectedDayIndex]}` : 'Macros';
            case 'profile': return 'Mi Perfil';
            case 'addMeal': return 'Añadir Nueva Comida';
            case 'loadWeek': return 'Cargar Semana Guardada';
            case 'finder': return 'Encontrar Receta por Ingredientes';
            case 'log': return selectedDayIndex !== null ? `Registro del ${weekDays[selectedDayIndex]}` : 'Registro Diario';
            case 'progress': return 'Mi Progreso';
            default: return '';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Header />
            <Controls
                onGenerate={generatePlan}
                onSave={handleSaveWeek}
                onLoad={() => setActiveModal('loadWeek')}
                onPrint={() => window.print()}
                onOpenProfile={() => setActiveModal('profile')}
                onOpenAddMeal={() => setActiveModal('addMeal')}
                onOpenFinder={() => setActiveModal('finder')}
                onOpenProgress={() => setActiveModal('progress')}
            />
            <WorkoutPlanner schedule={workoutSchedule} onUpdateSchedule={setWorkoutSchedule} />
            <WeeklyPlan
                plan={plan}
                workoutSchedule={workoutSchedule}
                onShowRecipe={handleShowRecipe}
                onSwapMeal={handleSwapMeal}
                onShowMacros={handleShowMacros}
                onToggleFasting={handleToggleFasting}
                onToggleCheat={handleToggleCheat}
                onShowLog={handleShowLog}
            />
            <Modal isOpen={activeModal !== null} onClose={() => setActiveModal(null)} title={getModalTitle()}>
                {getModalContent()}
            </Modal>
        </div>
    );
};

export default App;
