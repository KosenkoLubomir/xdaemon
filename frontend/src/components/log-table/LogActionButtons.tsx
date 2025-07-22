import React from 'react';

interface LogActionButtonsProps {
    loadingAction: 'save' | 'delete' | null;
    onSave: () => void;
    onDelete: () => void;
    disabled?: boolean;
    logId?: string; // optional for ARIA labels
}

const LogActionButtons: React.FC<LogActionButtonsProps> = ({
                                                               loadingAction,
                                                               onSave,
                                                               onDelete,
                                                               disabled = false,
                                                               logId,
                                                           }) => {
    return (
        <div className="flex items-center space-x-2">
            <button
                className={`${
                    disabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } min-w-[64px] text-white px-3 py-2 rounded text-sm font-semibold flex items-center justify-center`}
                onClick={onSave}
                disabled={disabled}
                aria-label={logId ? `Save log ${logId}` : 'Save log'}
            >
                {loadingAction === 'save' ? (
                    <span className="w-4 h-4 p-2 border-2 border-gray-300 border-t-white rounded-full animate-spin inline-block" />
                ) : (
                    <>Save</>
                )}
            </button>

            <button
                className={`${
                    disabled ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
                } min-w-[68px] text-white px-3 py-2 rounded text-sm font-semibold flex items-center justify-center`}
                onClick={onDelete}
                disabled={disabled}
                aria-label={logId ? `Delete log ${logId}` : 'Delete log'}
            >
                {loadingAction === 'delete' ? (
                    <span className="w-4 h-4 p-2 border-2 border-gray-300 border-t-white rounded-full animate-spin inline-block" />
                ) : (
                    <>Delete</>
                )}
            </button>
        </div>
    );
};

export default LogActionButtons;