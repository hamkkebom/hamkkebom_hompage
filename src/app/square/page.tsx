"use client";

import { useState, useEffect, useRef } from "react";

export default function SquarePage() {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const squareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!squareRef.current) return;
        const rect = squareRef.current.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
    };

    return (
        <>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600&display=swap');

        .square-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          overflow: hidden;
          position: relative;
          font-family: 'Outfit', sans-serif;
        }

        /* Ambient background glow */
        .square-page::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.15) 0%,
            rgba(168, 85, 247, 0.08) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: ambientPulse 4s ease-in-out infinite;
        }

        @keyframes ambientPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        /* Grid pattern */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
        }

        /* The main square container */
        .square-wrapper {
          perspective: 800px;
          z-index: 1;
        }

        .square {
          width: 220px;
          height: 220px;
          position: relative;
          border-radius: 28px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }

        .square:hover {
          transform: scale(1.08);
        }

        /* Glassmorphism inner surface */
        .square-inner {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.4) 0%,
            rgba(168, 85, 247, 0.3) 50%,
            rgba(236, 72, 153, 0.4) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            0 8px 32px rgba(99, 102, 241, 0.25),
            0 0 80px rgba(168, 85, 247, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        /* Shimmer effect */
        .square-inner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 70%
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        /* Rotating gradient border */
        .square-border {
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          background: conic-gradient(
            from var(--angle, 0deg),
            #6366f1,
            #a855f7,
            #ec4899,
            #f43f5e,
            #a855f7,
            #6366f1
          );
          z-index: -1;
          animation: rotateBorder 4s linear infinite;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .square:hover .square-border {
          opacity: 1;
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotateBorder {
          to { --angle: 360deg; }
        }

        /* Floating particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(168, 85, 247, 0.6);
          border-radius: 50%;
          pointer-events: none;
        }

        .p1 {
          top: 15%; left: 20%;
          animation: float1 3s ease-in-out infinite;
        }
        .p2 {
          top: 60%; left: 75%;
          animation: float2 3.5s ease-in-out infinite 0.5s;
        }
        .p3 {
          top: 80%; left: 30%;
          animation: float3 2.8s ease-in-out infinite 1s;
        }
        .p4 {
          top: 25%; left: 70%;
          animation: float1 3.2s ease-in-out infinite 0.3s;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(10px, -15px) scale(1.5); opacity: 1; }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-12px, -10px) scale(1.3); opacity: 0.9; }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(8px, -12px) scale(1.4); opacity: 0.8; }
        }

        /* Center icon */
        .center-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          z-index: 2;
          filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.5));
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .square:hover .center-icon {
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.8));
        }

        /* Label */
        .square-label {
          margin-top: 32px;
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          z-index: 1;
          transition: all 0.3s ease;
        }

        .square-label.active {
          color: rgba(168, 85, 247, 0.9);
          letter-spacing: 6px;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }

        /* Entrance animation */
        .entrance {
          opacity: 0;
          transform: scale(0.5) translateY(30px);
          animation: entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes entrance {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .label-entrance {
          opacity: 0;
          animation: labelIn 0.6s ease forwards 0.4s;
        }

        @keyframes labelIn {
          to { opacity: 1; }
        }

        /* Glow ring on hover */
        .glow-ring {
          position: absolute;
          inset: -20px;
          border-radius: 40px;
          border: 1px solid transparent;
          opacity: 0;
          transition: all 0.4s ease;
          pointer-events: none;
        }

        .square:hover .glow-ring {
          opacity: 1;
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.15);
          inset: -28px;
        }
      `}</style>

            <div className="square-page">
                <div className="grid-bg" />

                <div className="square-wrapper">
                    <div
                        ref={squareRef}
                        className={`square ${mounted ? "entrance" : ""}`}
                        style={{
                            transform: isHovered
                                ? `scale(1.08) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`
                                : undefined,
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            setMousePos({ x: 0, y: 0 });
                        }}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="square-border" />
                        <div className="square-inner">
                            <div className="particle p1" />
                            <div className="particle p2" />
                            <div className="particle p3" />
                            <div className="particle p4" />
                        </div>
                        <div className="center-icon">◆</div>
                        <div className="glow-ring" />
                    </div>
                </div>

                <p className={`square-label ${mounted ? "label-entrance" : ""} ${isHovered ? "active" : ""}`}>
                    THE SQUARE
                </p>
            </div>
        </>
    );
}
