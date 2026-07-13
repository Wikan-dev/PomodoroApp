import { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

interface AquaTimerLandingProps {
onStart?: () => void;
}

const colors = {
"--deep": "#0A2E4D",
"--ocean": "#145C7A",
"--lagoon": "#2E9CB0",
"--foam": "#EAFBFF",
"--coral": "#FF8F6B",
"--sun": "#FFD873",
} as CSSProperties;

const bubbles = Array.from({ length: 16 }, (_, i) => ({
id: i,
left: (i * 6.25) % 100,
size: 6 + ((i * 11) % 22),
duration: 9 + ((i * 5) % 14),
delay: (i * 1.3) % 10,
}));

const wavePath =
"M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,200 L0,200 Z " +
"M1200,60 C1350,110 1550,10 1800,60 C2050,110 2250,10 2400,60 L2400,200 L1200,200 Z";

const waves = [
{ fill: "#1C6E8C", opacity: 0.45, duration: 26, bottom: "0%" },
{ fill: "#134F68", opacity: 0.7, duration: 19, bottom: "-2%" },
{ fill: "#0A3348", opacity: 1, duration: 32, bottom: "-4%" },
];

export default function AquaTimerLanding({ onStart }: AquaTimerLandingProps) {
const navigate = useNavigate();
const landingPressed = useAppStore((state) => state.landingPressed);
const setLandingPressed = useAppStore((state) => state.setLandingPressed);
const setCurrentPage = useAppStore((state) => state.setCurrentPage);

const handleStart = () => {
    setLandingPressed(true);
    setCurrentPage("dashboard");
    onStart?.();
    window.setTimeout(() => setLandingPressed(false), 700);
    navigate("/dashboard");
};


return (
    <div
    style={colors}
    className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-(--lagoon) via-(--ocean) to-(--deep) text-(--foam)"
    >
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Quicksand:wght@400;500;600&display=swap');

        @keyframes floatUp {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: .85; }
        90% { opacity: .5; }
        100% { transform: translateY(-110vh) translateX(12px); opacity: 0; }
        }
        @keyframes drift {
        to { transform: translateX(-50%); }
        }
        @keyframes ripple {
        from { transform: scale(1); opacity: .6; }
        to { transform: scale(1.5); opacity: 0; }
        }
        @keyframes rise {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; opacity: 1 !important; }
        }
    `}</style>

    {bubbles.map((b) => (
        <span
        key={b.id}
        className="absolute -bottom-[5%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.85),rgba(255,255,255,.08))]"
        style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animation: `floatUp ${b.duration}s ease-in ${b.delay}s infinite`,
        }}
        />
    ))}

    <p className="relative z-10 mb-3 text-sm uppercase tracking-[0.35em] text-[#9FE8E0] opacity-0 [animation:rise_.8s_ease-out_.1s_forwards]">
        Timer Pomodoro Bertema Laut
    </p>

    <h1 className="relative z-10 font-['Baloo_2'] text-5xl font-bold leading-none opacity-0 drop-shadow-[0_6px_24px_rgba(0,20,35,.35)] [animation:rise_.8s_ease-out_.25s_forwards] sm:text-6xl md:text-7xl">
        Aqua<span className="text-(--coral)">Timer</span>
    </h1>

    <p className="relative z-10 mx-auto mt-4 mb-10 max-w-md text-center font-medium text-[#DFF7FA] opacity-0 [animation:rise_.8s_ease-out_.4s_forwards]">
        Fokus yang mengalir tenang, seperti ombak menuju pantai. Atur waktumu, selami pekerjaanmu.
    </p>

    <div className="relative z-10 flex flex-col items-center opacity-0 [animation:rise_.8s_ease-out_.55s_forwards]">
        <button
        onClick={handleStart}
        className={`relative rounded-full bg-(--sun) px-10 py-4 font-['Baloo_2'] text-lg font-semibold text-(--deep) shadow-[0_10px_26px_rgba(0,10,20,.3)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,10,20,.35)] ${
            landingPressed ? "scale-[0.97]" : ""
        }`}
        >
        Mulai Fokus
        <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-(--sun) [animation:ripple_2.6s_ease-out_infinite]" />
        <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-(--sun) [animation:ripple_2.6s_ease-out_1.3s_infinite]" />
        </button>
        <span className="mt-3 text-sm text-[#B9E9EA]">Selami sesi fokus pertamamu</span>
    </div>

    {waves.map((w, i) => (
        <div key={i} className="absolute left-0 right-0 h-[22vh] min-h-[140px]" style={{ bottom: w.bottom }}>
        <svg
            viewBox="0 0 2400 200"
            preserveAspectRatio="none"
            className="h-full w-[200%]"
            style={{ animation: `drift ${w.duration}s linear infinite`, opacity: w.opacity }}
        >
            <path d={wavePath} fill={w.fill} />
        </svg>
        </div>
    ))}
    </div>
);
}