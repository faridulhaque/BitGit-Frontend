import { IUser } from "./userTypes";

export interface TContext {
  default: number;
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
  user: IUser | null;
}

export type TTheme = "dark" | "light";
