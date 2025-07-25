import React, { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import toast from 'react-hot-toast';
import LogsTableRow from './LogsTableRow';
import useWindowWidth from '../../hooks/useWindowWidth';
import MobileLogTableItem from "./MobileLogTableItem";
import { API_BASE_URL } from '../../config';

type Log = {
    id: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    text: string;
};

const LogsTable = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [editing, setEditing] = useState<Record<string, Partial<Log>>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const [logToDelete, setLogToDelete] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<Record<string, 'save' | 'delete' | null>>({});

    const sortedLogs = [...logs].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    const totalPages = Math.ceil(sortedLogs.length / logsPerPage);
    const currentLogs = sortedLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

    const isMobile = useWindowWidth() < 768;

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/logs`);
            const data = await res.json();
            setLogs(data);
        } catch (e) {
            toast.error('Failed to fetch logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleEditChange = (id: string, field: keyof Log, value: string) => {
        setEditing((prev) => {
            const currentLog = logs.find((log) => log.id === id);
            const base = prev[id] ?? { owner: currentLog?.owner || '', text: currentLog?.text || '' };
            return {
                ...prev,
                [id]: {
                    ...base,
                    [field]: value,
                },
            };
        });
    };

    const handleSave = async (id: string) => {
        setActionLoading((prev) => ({ ...prev, [id]: 'save' }));

        await new Promise((r) => setTimeout(r, 1000)); // Simulate delay

        const updated = editing[id];
        const res = await fetch(`${API_BASE_URL}/logs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
        });

        if (res.ok) {
            const updatedLog = await res.json();
            setLogs((prev) => prev.map((log) => (log.id === id ? updatedLog : log)));
            toast.success('Log updated');
            setEditing((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        } else {
            toast.error('Failed to update log');
        }

        setActionLoading((prev) => ({ ...prev, [id]: null }));
    };

    const handleAdd = async () => {
        setActionLoading((prev) => ({ ...prev, new: 'save' }));

        const newLog = {
            owner: '',
            text: '',
        };

        try {
            const res = await fetch(`${API_BASE_URL}/logs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLog),
            });

            if (res.ok) {
                const created = await res.json();
                setLogs((prev) => [created, ...prev]);
                setEditing((prev) => ({
                    ...prev,
                    [created.id]: { owner: created.owner, text: created.text },
                }));
                toast.success('New log created');
            } else {
                toast.error('Failed to create log');
            }
        } catch (err) {
            toast.error('Network error while adding log');
        }

        setActionLoading((prev) => ({ ...prev, new: null }));
    };

    const requestDelete = (id: string) => {
        setLogToDelete(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!logToDelete) return;

        setActionLoading((prev) => ({ ...prev, [logToDelete]: 'delete' }));

        await new Promise((r) => setTimeout(r, 1000)); // Simulate delay

        const res = await fetch(`${API_BASE_URL}/logs/${logToDelete}`, { method: 'DELETE' });

        if (res.ok) {
            setLogs((prev) => prev.filter((log) => log.id !== logToDelete));
            toast.success('Log deleted');
        } else {
            toast.error('Failed to delete log');
        }

        setActionLoading((prev) => ({ ...prev, [logToDelete]: null }));
        setLogToDelete(null);
    };

    return (
        <div className="mt-6">
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={handleAdd}
                        data-testid="new-log-button"
                        className={
                        `mb-4 block font-semibold ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none}`
                    }>+ Add New</button>

                    <div className={`${isMobile ? "" : "overflow-hidden rounded-md border border-gray-200 bg-white"}`}>
                        {isMobile ?  (
                            <>
                                {currentLogs.map((log) => (
                                    <MobileLogTableItem
                                        key={log.id}
                                        log={log}
                                        editedLog={editing[log.id]}
                                        onEditChange={handleEditChange}
                                        onSave={handleSave}
                                        onDelete={requestDelete}
                                        loadingAction={actionLoading[log.id] ?? null}
                                    />
                                ))}
                            </>
                        ) : (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-700 bg-gray-200 text-sm">
                                    <th className="p-2">Owner</th>
                                    <th className="p-2">Created At</th>
                                    <th className="p-2">Updated At</th>
                                    <th className="p-2">Log Text</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentLogs.map((log) => (
                                    <LogsTableRow
                                        key={log.id}
                                        log={log}
                                        editedLog={editing[log.id]}
                                        onEditChange={handleEditChange}
                                        onSave={handleSave}
                                        onDelete={requestDelete}
                                        loadingAction={actionLoading[log.id] ?? null}
                                    />
                                ))}
                            </tbody>
                        </table>
                        )}
                    </div>
                </>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`px-4 py-2 border rounded ${
                                currentPage === i + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white hover:border-blue-500'
                            }`}
                            onClick={() => setCurrentPage(i + 1)}
                            aria-label={`Go to page ${i + 1}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this log?"
            />
        </div>
    );
};

export default LogsTable;