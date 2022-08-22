import { createContext } from "react";

export type stateWithoutSet = Omit<Partial<IGlobalState>, 'setGlobalState'>;

export interface IGlobalState {
  projectId?: number;
  setGlobalState: (state: stateWithoutSet) => void;
}

export default createContext<IGlobalState>(getDefaultState())

export function getDefaultState() {
  return {
    projectId: undefined,
    setGlobalState: (s: stateWithoutSet) => {},
  }
}