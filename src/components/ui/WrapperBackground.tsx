"use client"
import React, { useEffect, useRef } from "react";

export const WrapperBackground = ({ children }: { children: React.ReactNode }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Error reproduciendo el video:", error)
            })
        }
    }, [])
    return <div>
        <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
        >
            <source src="/video-background.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
        </video>

        <div className="absolute inset-0 bg-[#0a1629]/90 z-0" />

        <div className="relative z-10 w-full text-center">
            {children}
        </div>
    </div>;
};

