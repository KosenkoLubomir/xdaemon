import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <p className="text-gray-800 mb-6">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-sm font-semibold"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded text-sm font-semibold"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        aria-label="Confirm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;