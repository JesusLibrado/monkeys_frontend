import { ReactNode } from "react";

export type ChildrenType = Readonly<{ children: ReactNode }>;

export type BootstrapVariantType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light";
