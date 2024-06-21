"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

interface StatusContextProps {
  children: ReactNode;
}

export enum StatusMode {
  IDLE = "idle",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export const StatusModeContext = createContext(StatusMode.IDLE);
export const StatusSetModeContext = createContext({
  setStatus: (s: StatusMode) => {},
});

export function StatusContext({ children }: StatusContextProps) {
  const [mode, setMode] = useState<StatusMode>(StatusMode.IDLE);

  const setStatus = useMemo(
    () => ({ setStatus: (s: StatusMode) => setMode(s) }),
    []
  );
  return (
    <StatusModeContext.Provider value={mode}>
      <StatusSetModeContext.Provider value={setStatus}>
        {children}
      </StatusSetModeContext.Provider>
    </StatusModeContext.Provider>
  );
}
