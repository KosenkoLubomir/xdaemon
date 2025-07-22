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

interface LogsTableRowProps {
    log: Log;
    editedLog: Partial<Log> | undefined;
    onEditChange: (id: string, field: keyof Log, value: string) => void;
    onSave: (id: string) => void;
    onDelete: (id: string) => void;
    loadingAction: 'save' | 'delete' | null;
}

const LogsTableRow: React.FC<LogsTableRowProps> = ({
                                                       log,
                                                       editedLog,
                                                       onEditChange,
                                                       onSave,
                                                       onDelete,
                                                       loadingAction,
                                                   }) => {
    return (
        <tr key={log.id} className="border-t hover:bg-blue-50">
            <td className="p-2">
                <LogOwnerInput
                    id={log.id}
                    value={editedLog?.owner ?? log.owner}
                    onChange={(val) => onEditChange(log.id, 'owner', val)}
                />
            </td>
            <td className="p-2 text-sm">{new Date(log.createdAt).toLocaleString()}</td>
            <td className="p-2 text-sm">{new Date(log.updatedAt).toLocaleString()}</td>
            <td className="p-2">
                <LogTextInput
                    id={log.id}
                    value={editedLog?.text ?? log.text}
                    onChange={(val) => onEditChange(log.id, 'text', val)}
                />
            </td>
            <td className="p-2 space-x-2">
                <LogActionButtons
                    loadingAction={loadingAction}
                    onSave={() => onSave(log.id)}
                    onDelete={() => onDelete(log.id)}
                    disabled={!!loadingAction}
                    logId={log.id}
                />
            </td>
        </tr>
    );
};

export default LogsTableRow;