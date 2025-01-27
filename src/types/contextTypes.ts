import { IUser } from "./userTypes";

export interface TContext {
  default: number;
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export type TTheme = "dark" | "light";
