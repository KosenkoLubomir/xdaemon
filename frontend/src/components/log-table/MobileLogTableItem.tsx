
import React from 'react';
import LogActionButtons from './LogActionButtons';
import LogOwnerInput from './LogOwnerInput';
import LogTextInput from './LogTextInput';

type Log = {
    id: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    text: string;
};

interface MobileLogTableItemProps {
    log: Log;
    editedLog: Partial<Log> | undefined;
    onEditChange: (id: string, field: keyof Log, value: string) => void;
    onSave: (id: string) => void;
    onDelete: (id: string) => void;
    loadingAction: 'save' | 'delete' | null;
}

const MobileLogTableItem: React.FC<MobileLogTableItemProps> = ({
                                                       log,
                                                       editedLog,
                                                       onEditChange,
                                                       onSave,
                                                       onDelete,
                                                       loadingAction,
                                                   }) => {
    return (
        <div key={log.id} className="p-2 border rounded-md bg-white mb-4">
            <div className="p-2 flex items-center space-x-2">
                <label className="text-sm font-bold" htmlFor={log?.id + "-owner"} aria-label={`Owner of log ${log.id}`}>Owner:</label>
                <LogOwnerInput
                    id={log.id}
                    value={editedLog?.owner ?? log.owner}
                    onChange={(val) => onEditChange(log.id, 'owner', val)}
                />
            </div>
            <div className="p-2 text-sm"><b>Created At:</b> {new Date(log.createdAt).toLocaleString()}</div>
            <div className="p-2 text-sm"><b>Updated At:</b> {new Date(log.updatedAt).toLocaleString()}</div>
            <div className="p-2">
                <label className="mb-2 text-sm font-bold block" htmlFor={log?.id + "-text"} aria-label={`Log text for log ${log.id}`
                }>Log Text:</label>
                <LogTextInput
                    id={log.id}
                    value={editedLog?.text ?? log.text}
                    onChange={(val) => onEditChange(log.id, 'text', val)}
                />
            </div>
            <div className="p-2 space-x-2 flex justify-end">
                <LogActionButtons
                    loadingAction={loadingAction}
                    onSave={() => onSave(log.id)}
                    onDelete={() => onDelete(log.id)}
                    disabled={!!loadingAction}
                    logId={log.id}
                />
            </div>
        </div>
    );
};

export default MobileLogTableItem;