import React from 'react';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
            <p className="mt-4 text-gray-700">{message}</p>
        </div>
    );
};

export default Loading;
