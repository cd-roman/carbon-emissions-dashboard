import {PieChart as Pie, pieArcLabelClasses} from "@mui/x-charts";
import {useContext} from "react";
import {MyGlobalContext} from "../../base";

import styles from './PieChart.module.scss';
import { useMediaQuery } from "@mui/material";

export const PieChart = () => {
  const { carbon, carbonFl, carbonCar } = useContext(MyGlobalContext);
  const widthMin1200 = useMediaQuery("(min-width: 1200px)");

  const getPercentageString = (val: number): string => {
    const percent = Math.round((val / carbon) * 100);

    if (isFinite(percent)) {
      return `${percent}%`;
    }

    return "";
  };

  return (
    <div className={styles.piechart}>
      <h2>Your total carbon emission</h2>
      <div className={styles.piechartContainer}>
        <Pie
          tooltip={{
            trigger: "none",
          }}
          series={[
            {
              arcLabel: (item) => {
                if (item.label === undefined) {
                  return "";
                }
                return getPercentageString(item.value);
              },
              arcLabelMinAngle: 1,
              data: [
                            {id: 0, value: carbonFl || carbonCar ? 0 : 1, color: '#a0d4a3'},
                            {id: 1, value: carbonFl, label: 'Flights', color: '#F7B32B'},
                            {id: 2, value: carbonCar, label: 'Car trips', color: '#F25F5C'},

              ],
              outerRadius: widthMin1200 ? 250 : 100,
              cy: widthMin1200 ? 276 : 125,
              startAngle: 90,
              endAngle: 450,
              paddingAngle: 0,
            },
          ]}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: 24,
                        fill: 'white',
                        fontWeight: 'bold',
              [`&:not(:last-child)`]: {
                            fill: '#61463A'
              },
            },
                    '& .MuiChartsLegend-mark': {
              ry: 4,
              rx: 4,
            },
                    '& .MuiResponsiveChart-container': {

                    },

          }}
          margin={{ right: 5 }}
          height={widthMin1200 ? 600 : 300}
        />
        <div className={styles.labels}>
          <div className={styles.labelAmber}>Flights</div>
          <div className={styles.labelRed}>Car trips</div>
        </div>
      </div>
    </div>
  );
};
