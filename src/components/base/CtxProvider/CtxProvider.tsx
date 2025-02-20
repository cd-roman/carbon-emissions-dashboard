import {ReactNode, useState} from "react";
import {BarChartType, Length, MyGlobalContext, Weight} from "./context";
import data from "../../../data/popular-flights.json";
import carsData from "../../../data/cars.json";
import { Flights } from "../../../types";

const { flights } = data;
const { cars } = carsData;

let flightsCarbon:BarChartType[]=[];
let carsCarbon:BarChartType[]=[]

flights.forEach((_, i) => {
  if (flightsCarbon.findIndex(({ id }) => id === i) < 0) {
    flightsCarbon.push({
      id: i,
      carbon: 0,
      distance: 0,
    });
  }
});
cars.forEach((_, i) => {
  if (carsCarbon.findIndex(({ id }) => id === i) < 0) {
    carsCarbon.push({
      id: i,
      carbon: 0,
      distance: 0,
    });
  }
});

interface LayoutProps {
    children: ReactNode
}

export const CtxProvider = ({ children }: LayoutProps) => {
  const [length, setLength] = useState<Length>("km");
  const [weight, setWeight] = useState<Weight>("kg");
  const [carbon, setCarbon] = useState<number>(0);
  const [carbonFl, setCarbonFl] = useState<number>(0);
  const [carbonCar, setCarbonCar] = useState<number>(0);
  const [flightBarChartArr, setFlightBarChartArr] =
    useState<BarChartType[]>(flightsCarbon);
  const [carsBarChartArr, setCarsBarChartArr] =
    useState<BarChartType[]>(carsCarbon);
  const [flights, setFlights] = useState<Flights[]>(data.flights);
  const [customFlights, setCustomFlights] = useState<Flights[]>([]);

  return (
    <MyGlobalContext.Provider
      value={{
        length,
        setLength,
        weight,
        setWeight,
        carbon,
        setCarbon,
        carbonFl,
        carbonCar,
        setCarbonFl,
        setCarbonCar,
        flightBarChartArr,
        setFlightBarChartArr,
        carsBarChartArr,
        setCarsBarChartArr,
        flights,
        setFlights,
        customFlights,
        setCustomFlights,
      }}
    >
      {children}
    </MyGlobalContext.Provider>
  );
};