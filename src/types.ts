import {ReactNode} from "react";

export type RouteType = {
    path: string;
    component: ReactNode;
    name: string;
};

export type Cars = {
  id: number;
  type: string;
  gasCarbon: number;
  dieselCarbon: number;
};