import { useEffect, type CSSProperties } from "react";
import { useAppStore, type SessionConfig } from "../store/appStore";

interface StepperProps {
label: string;
value: number;
unit: string;
min: number;
max: number;
step: number;
onChange: (next: number) => void;
}

interface AquaTimerDashboardProps {
onStartSession?: (config: SessionConfig) => void;
}

const palette = {
sky: "#7FE8DE",
lagoon: "#3FB6C4",
ocean: "#146B8C",
foam: "#EAFBFF",
sun: "#FFD873",
};

const bubbles = Array.from({ length: 10 }, (_, i) => ({
id: i,
left: (i * 9.5) % 100,
size: 5 + ((i * 9) % 18),
duration: 11 + ((i * 4) % 12),
delay: (i * 1.6) % 10,
}));

/**
 * Keeps a number inside a min/max range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value: number, min: number, max: number): number {
return Math.min(Math.max(value, min), max);
}

/**
 * @param {{
 *   label: string,
 *   value: number,
 *   unit: string,
 *   min: number,
 *   max: number,
 *   step: number,
 *   onChange: (next: number) => void,
 * }} props
 */
function Stepper({ label, value, unit, min, max, step, onChange }: StepperProps) {
const circleButton: CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: "999px",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    color: palette.foam,
    fontSize: "1rem",
    lineHeight: 1,
    cursor: "pointer",
};

return (
    <div
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.08)",
        padding: "0.5rem 0.9rem",
    }}
    >
    <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <button
        type="button"
        style={circleButton}
        onClick={() => onChange(clamp(value - step, min, max))}
        >
        −
        </button>
        <span style={{ width: 52, textAlign: "center", fontFamily: "'Baloo 2', cursive", fontWeight: 600 }}>
        {value}
        {unit}
        </span>
        <button
        type="button"
        style={circleButton}
        onClick={() => onChange(clamp(value + step, min, max))}
        >
        +
        </button>
    </div>
    </div>
);
}

export default function AquaTimerDashboard({ onStartSession }: AquaTimerDashboardProps) {
const userName = useAppStore((state) => state.userName);
const sessionName = useAppStore((state) => state.sessionName);
const focusMinutes = useAppStore((state) => state.focusMinutes);
const breakMinutes = useAppStore((state) => state.breakMinutes);
const totalSessions = useAppStore((state) => state.totalSessions);
const confirmed = useAppStore((state) => state.confirmed);
const setUserName = useAppStore((state) => state.setUserName);
const setSessionName = useAppStore((state) => state.setSessionName);
const setFocusMinutes = useAppStore((state) => state.setFocusMinutes);
const setBreakMinutes = useAppStore((state) => state.setBreakMinutes);
const setTotalSessions = useAppStore((state) => state.setTotalSessions);
const setConfirmed = useAppStore((state) => state.setConfirmed);
const setCurrentPage = useAppStore((state) => state.setCurrentPage);

useEffect(() => {
    setCurrentPage("dashboard");
}, [setCurrentPage]);

function handleStart() {
    const sessionConfig: SessionConfig = {
    userName,
    sessionName,
    focusMinutes,
    breakMinutes,
    totalSessions,
    };

    onStartSession?.(sessionConfig);
    setConfirmed(true);
    window.setTimeout(function () {
    setConfirmed(false);
    }, 2200);
}

const inputStyle: CSSProperties = {
    marginTop: "0.3rem",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    padding: "0.45rem 0.9rem",
    color: palette.foam,
    outline: "none",
    fontFamily: "'Quicksand', sans-serif",
    fontSize: "0.95rem",
};

const greeting = userName ? "Halo, " + userName + " — siapkan dulu sesimu sebelum menyelam ke pekerjaan." : "Halo — siapkan dulu sesimu sebelum menyelam ke pekerjaan.";

return (
    <div
    style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1rem, 4vh, 3rem) 1rem",
        background: "linear-gradient(to bottom, " + palette.sky + ", " + palette.lagoon + ", " + palette.ocean + ")",
        color: palette.foam,
        fontFamily: "'Quicksand', sans-serif",
    }}
    >
    <style>
        {"@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Quicksand:wght@400;500;600&display=swap');" +
        "@keyframes floatUp { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: .7; } 90% { opacity: .4; } 100% { transform: translateY(-110vh) translateX(10px); opacity: 0; } }" +
        "@keyframes rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }" +
        "@media (prefers-reduced-motion: reduce) { * { animation: none !important; opacity: 1 !important; } }"}
    </style>

    {bubbles.map(function (b) {
        return (
        <span
            key={b.id}
            style={{
            position: "absolute",
            bottom: "-5%",
            left: b.left + "%",
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,.8), rgba(255,255,255,.06))",
            animation: "floatUp " + b.duration + "s ease-in " + b.delay + "s infinite",
            }}
        />
        );
    })}

    <div
        style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "min(680px, 94vw)",
        maxHeight: "94vh",
        overflowY: "auto",
        borderRadius: "1.5rem",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.1)",
        padding: "clamp(1.1rem, 3vh, 2rem) clamp(1.25rem, 4vw, 2.25rem)",
        boxShadow: "0 20px 60px rgba(0,10,25,.35)",
        backdropFilter: "blur(10px)",
        opacity: 0,
        animation: "rise .7s ease-out .1s forwards",
        }}
    >
        <p style={{ textAlign: "center", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "#DFFFFB" }}>
        Aqua Timer
        </p>

        <h1
        style={{
            marginTop: "0.4rem",
            textAlign: "center",
            fontFamily: "'Baloo 2', cursive",
            fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
            fontWeight: 700,
        }}
        >
        Atur Sesi Fokusmu
        </h1>

        <p style={{ marginTop: "0.35rem", textAlign: "center", fontSize: "0.85rem", color: "#F0FFFC" }}>
        {greeting}
        </p>

        <div style={{ marginTop: "1.1rem", display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
        <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500 }}>
            Nama kamu
            <input
                value={userName}
                onChange={function (e) {
                setUserName(e.target.value);
                }}
                placeholder="Tulis namamu"
                style={inputStyle}
            />
            </label>

            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500 }}>
            Nama sesi
            <input
                value={sessionName}
                onChange={function (e) {
                setSessionName(e.target.value);
                }}
                placeholder="mis. Mengerjakan Skripsi"
                style={inputStyle}
            />
            </label>
        </div>

        <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Stepper label="Durasi fokus" value={focusMinutes} unit=" mnt" min={5} max={90} step={5} onChange={setFocusMinutes} />
            <Stepper label="Durasi istirahat" value={breakMinutes} unit=" mnt" min={1} max={30} step={1} onChange={setBreakMinutes} />
            <Stepper label="Jumlah sesi" value={totalSessions} unit="x" min={1} max={12} step={1} onChange={setTotalSessions} />
        </div>
        </div>

        <button
        onClick={handleStart}
        style={{
            marginTop: "1.25rem",
            width: "100%",
            borderRadius: "999px",
            background: palette.sun,
            padding: "0.6rem",
            fontFamily: "'Baloo 2', cursive",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: palette.ocean,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 26px rgba(0,10,20,.3)",
        }}
        >
        Mulai Pomodoro
        </button>

        <p style={{ marginTop: "0.6rem", textAlign: "center", fontSize: "0.7rem", color: "rgba(255,255,255,0.7)" }}>
        {confirmed
            ? "Sesi tersimpan — timer belum berjalan."
            : "Halaman ini baru untuk mengatur sesi, timer belum aktif."}
        </p>
    </div>
    </div>
);
}