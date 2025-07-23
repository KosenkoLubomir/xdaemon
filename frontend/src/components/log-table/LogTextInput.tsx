import React from 'react';

interface LogTextInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
}

const LogTextInput: React.FC<LogTextInputProps> = ({ id, value, onChange }) => {
    return (
        <textarea
            id={`${id}-text`}
            data-testid="log-text"
            className="border p-1.5 w-full text-sm rounded-sm"
            rows={1}
            maxLength={500}
            name="text"
            placeholder="Enter log text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default LogTextInput;