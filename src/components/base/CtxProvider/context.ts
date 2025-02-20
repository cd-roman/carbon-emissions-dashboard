import {createContext, useContext} from "react";
import { Flights } from "../../../types";

export type Length = "km" | "mi";
export type Weight = "kg" | "lb";
export type BarChartType = {
  id: number;
  carbon: number;
  distance: number;
};

export type GlobalContext = {
  length: Length;
  setLength: (c: Length) => void;
  weight: Weight;
  setWeight: (c: Weight) => void;
  carbon: number;
  setCarbon: (c: number) => void;
  carbonFl: number;
  setCarbonFl: (c: number) => void;
  carbonCar: number;
  setCarbonCar: (c: number) => void;
  flightBarChartArr: BarChartType[];
  setFlightBarChartArr: (c: BarChartType[]) => void;
  carsBarChartArr: BarChartType[];
  setCarsBarChartArr: (c: BarChartType[]) => void;
  flights: Flights[];
  setFlights: (c: Flights[]) => void;
  customFlights: Flights[];
  setCustomFlights: (c: Flights[]) => void;
};

export const MyGlobalContext = createContext<GlobalContext>({
  length: "km",
  setLength: (c) => {
    console.log(c);
  },
  weight: "kg",
  setWeight: (c) => {
    console.log(c);
  },
  carbonFl: 0,
  setCarbonFl: (c) => {
    console.log(c);
  },
  carbon: 0,
  setCarbon: (c) => {
    console.log(c);
  },
  carbonCar: 0,
  setCarbonCar: (c) => {
    console.log(c);
  },
  flightBarChartArr: [],
  setFlightBarChartArr: () => {},
  carsBarChartArr: [],
  setCarsBarChartArr: () => {},
  flights: [],
  setFlights: () => {},
  customFlights: [],
  setCustomFlights: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext)