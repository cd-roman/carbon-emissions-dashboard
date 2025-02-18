import {ReactNode, useState} from "react";
import {BarChartType, Length, MyGlobalContext, Weight} from "./context";

let flightsCarbon:BarChartType[]=[];
let carsCarbon:BarChartType[]=[]

interface LayoutProps {
    children: ReactNode
}

export const CtxProvider = ({children} : LayoutProps) => {
    const [length, setLength] = useState<Length>("km");
    const [weight, setWeight] = useState<Weight>("kg");
    const [carbon, setCarbon] = useState<number>(0);
    const [carbonFl, setCarbonFl] = useState<number>(0);
    const [carbonCar, setCarbonCar] = useState<number>(0);
    const [flightBarChartArr, setFlightBarChartArr] = useState<BarChartType[]>(flightsCarbon);
    const [carsBarChartArr, setCarsBarChartArr] = useState<BarChartType[]>(carsCarbon);
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
                setCarsBarChartArr
            }}
        >
            {children}
        </MyGlobalContext.Provider>
    );
};