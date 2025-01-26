export interface TContext {
  default: number;
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

export type TTheme = "dark" | "light";
