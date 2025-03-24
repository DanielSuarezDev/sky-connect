"use client"
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-provider";

export const WrapperBackground = ({ children }: { children: React.ReactNode }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { theme } = useTheme()
    const isDark = theme === "dark"

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
            // className="absolute inset-0 w-full h-full object-cover z-0"
            className="fixed inset-0 w-full h-full object-cover z-0"
        >
            <source src="/video-background.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
        </video>

        <div className={`fixed inset-0 ${isDark ? 'bg-[#0a1629]/80' : 'bg-white/70'} z-0 transition-colors duration-300`} />

        <div className={`relative z-10 w-full text-center ${isDark ? 'text-white' : 'text-[#0a1629]'} transition-colors duration-300`}>
            {children}
        </div>
    </div>;
};

