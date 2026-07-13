import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SessionConfig {
userName: string;
sessionName: string;
focusMinutes: number;
breakMinutes: number;
totalSessions: number;
}

interface AppState extends SessionConfig {
landingPressed: boolean;
currentPage: "landing" | "dashboard";
confirmed: boolean;
setLandingPressed: (pressed: boolean) => void;
setCurrentPage: (page: AppState["currentPage"]) => void;
setSessionConfig: (config: Partial<SessionConfig>) => void;
setUserName: (name: string) => void;
setSessionName: (name: string) => void;
setFocusMinutes: (value: number) => void;
setBreakMinutes: (value: number) => void;
setTotalSessions: (value: number) => void;
setConfirmed: (confirmed: boolean) => void;
reset: () => void;
}

const initialState: SessionConfig & { landingPressed: boolean; currentPage: "landing" | "dashboard"; confirmed: boolean } = {
userName: "",
sessionName: "",
focusMinutes: 25,
breakMinutes: 5,
totalSessions: 4,
landingPressed: false,
currentPage: "landing",
confirmed: false,
};

export const useAppStore = create<AppState>()(
persist(
(set) => ({
    ...initialState,
    setLandingPressed: (landingPressed) => set({ landingPressed }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setSessionConfig: (config) => set((state) => ({ ...state, ...config })),
    setUserName: (userName) => set({ userName }),
    setSessionName: (sessionName) => set({ sessionName }),
    setFocusMinutes: (focusMinutes) => set({ focusMinutes }),
    setBreakMinutes: (breakMinutes) => set({ breakMinutes }),
    setTotalSessions: (totalSessions) => set({ totalSessions }),
    setConfirmed: (confirmed) => set({ confirmed }),
    reset: () => set(initialState),
}),
{
    name: "aqua-timer-store",
}
)
);
