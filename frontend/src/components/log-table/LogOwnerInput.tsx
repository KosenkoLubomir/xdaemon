import React from 'react';

interface LogOwnerInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
}

const LogOwnerInput: React.FC<LogOwnerInputProps> = ({ id, value, onChange }) => {
    return (
        <input
            id={`${id}-owner`}
            data-testid="log-owner"
            className="border p-1.5 rounded-sm w-full text-sm"
            name="owner"
            maxLength={50}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter owner name"
        />
    );
};

export default LogOwnerInput;