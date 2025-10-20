
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div className="glass-effect rounded-lg shadow-2xl w-full max-w-lg animate-fade-in-up">
                <div className="p-6 border-b border-white/20 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-300 hover:text-white text-3xl transition-colors">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh] text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
