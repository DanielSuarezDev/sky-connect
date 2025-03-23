import React from 'react';
import { useRouter } from 'next/navigation';

export const GoBack = () => {
    const router = useRouter();
    return (
        <div className="mt-6 text-center">
            <button
                onClick={() => router.back()}
                className="text-[#006fee] hover:text-[#3f8fff] inline-flex items-center"
            >
                ← Volver a resultados
            </button>
        </div>
    );
};