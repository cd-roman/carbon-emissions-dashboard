import { useContext, useEffect, useRef, useState } from "react";
import { CustomAutocomplete, MyGlobalContext } from "../../base";
import { Flights } from "../../../types";
import {
  apiAirports,
  getDistanceBetweenAirports,
  postFlightsTravelEstimate,
} from "../../../api";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import styles from "../../base/TableRowFlight/TableRowFlight.module.scss";
import { ReactComponent as DeleteIcon } from "../../../assets/close.svg";

type NewAirportProps = {
  info: Flights;
  flights: Flights[];
  setFlights: (c: Flights[]) => void;
  customFlights: Flights[];
  setCustomFlights: (c: Flights[]) => void;
  className?: string;
};

const iataCodeArray: string[] = [];
apiAirports.map((v) => {
  return iataCodeArray.push(`${v.municipality} ${v.iata_code}`);
});

export const NewAirport = ({
  info,
  flights,
  setFlights,
  setCustomFlights,
  className,
}: NewAirportProps) => {
  const [dep, setDep] = useState("");
  const [arriv, setArriv] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [carbon, setCarbon] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const committed = useRef(false);

  const { setFlightBarChartArr, flightBarChartArr } =
    useContext(MyGlobalContext);
  const onSelectDeparture = (val: string) => {
    if (val) {
      setDep(val);
    }
  };
  const onSelectArrival = (val: string) => {
    if (val) {
      setArriv(val);
    }
  };

  useEffect(() => {
    if (!dep || !arriv) {
      return;
    }

    const from = dep.slice(-3);
    const to = arriv.slice(-3);
    let cancelled = false;

    setLoading(true);
    setError(null);

    Promise.all([
      getDistanceBetweenAirports({
        iata_airport_from: from,
        iata_airport_to: to,
      }),
      postFlightsTravelEstimate({
        iata_airport_from: from,
        iata_airport_to: to,
      }),
    ])
      .then(([distanceRes, estimateRes]) => {
        if (cancelled) {
          return;
        }
        setDistance(Number(distanceRes?.data?.data?.distance));
        setCarbon(Number(estimateRes?.data?.data?.co2e_kg));
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        const status = err?.response?.status;
        setError(
          status === 401 || status === 403
            ? "API key invalid or quota exceeded."
            : status === 429
              ? "Too many requests, please wait."
              : status === 400
                ? "Unsupported airport, try another."
                : err?.code === "ECONNABORTED"
                  ? "Request timed out, please try again."
                  : !err?.response
                    ? "Network error, check your connection."
                    : "Service unavailable, please try again.",
        );
        console.error("Error:", err);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dep, arriv]);

  useEffect(() => {
    if (committed.current || distance === null || carbon === null) {
      return;
    }
    committed.current = true;

    setFlightBarChartArr([
      ...flightBarChartArr,
      {
        id: flightBarChartArr.length,
        carbon: 0,
        distance: 0,
      },
    ]);

    setFlights([
      ...flights,
      {
        id: `${flights.length + 1}`,
        departure: dep.slice(-3),
        arrival: arriv.slice(-3),
        distance: `${distance}`,
        carbon: `${carbon}`,
        custom: true,
      },
    ]);

    setCustomFlights([]);
  }, [
    dep,
    arriv,
    flightBarChartArr,
    flights,
    setCustomFlights,
    setFlightBarChartArr,
    setFlights,
    distance,
    carbon,
  ]);

  const handelClear = () => {
    setCustomFlights([]);
  };

  const departureName = apiAirports.find((v) => v.iata_code === dep.slice(-3));
  const arrivalName = apiAirports.find((v) => v.iata_code === arriv.slice(-3));

  const cellContent = (value: number | null) => {
    if (loading) return "Loading...";
    if (error) return error;
    return value === null ? 0 : Math.round(value);
  };

  return (
    <>
      <hr className={styles.flightRowDivider} />
      <div className={clsx(styles.flightRow, className)}>
        <div>{info.id}</div>
        <div className={styles.airportName}>
          {departureName ? (
            `${departureName.municipality} (${departureName.iata_code})`
          ) : (
            <CustomAutocomplete
              shouldFocus
              dataArray={iataCodeArray}
              id="departureSelect"
              onSelectValue={onSelectDeparture}
              label="Enter airport..."
            />
          )}
        </div>
        <div className={styles.airportName}>
          {arrivalName ? (
            `${arrivalName.municipality} (${arrivalName.iata_code})`
          ) : (
            <CustomAutocomplete
              dataArray={iataCodeArray}
              id="arrivalSelect"
              onSelectValue={onSelectArrival}
              label="Enter airport..."
            />
          )}
        </div>
        <div>{cellContent(distance)}</div>
        <div>0</div>
        <div className={styles.deleteCell}>
          <span>{cellContent(carbon)}</span>
          <IconButton
            onClick={handelClear}
            style={{ marginLeft: 0 }}
            aria-label="delete"
            size="small"
            className={styles.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
