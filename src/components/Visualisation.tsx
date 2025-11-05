import { useMemo } from "react";
import useStore from "../state/store";
import { BarChart } from "./BarChart";
import { ExpensesList, type DataNumber } from "../state/Config";
import { getMaxInMaxOut } from "../utils/Utils";

const Visualisation = () => {
  const currentSelection = useStore((state) => state.currentSelection);
  const selectedMonths = useStore((state) => state.selectedMonths);
  const vizType = useStore((state) => state.vizType);

  if (!currentSelection.length) {
    return null;
  }

  const { monthlyData, maxIn, maxOut } = useMemo(() => {
    const calculateTotals = (rows) => {
      switch (vizType) {
        case "Incomings":
          {
            const totals = {
              Incoming: [0, 0],
              Outgoing: [0, 0],
            };

            for (let i = 0; i < rows.length; ++i) {
              const amount = rows[i].amount;
              const vat = rows[i].vat;
              if (amount < 0) {
                totals.Outgoing[0] += amount;
                if (vat) {
                  totals.Outgoing[1] += amount / 6;
                }
              } else {
                totals.Incoming[0] += amount;
                if (vat) {
                  totals.Incoming[1] += amount / 6;
                }
              }
            }

            return totals;
          }
          break;

        case "Categories":
          {
            const totals: { [key: string]: number[] } = {};
            ExpensesList.forEach((expense) => {
              totals[expense] = [0, 0];
            });

            rows.forEach((row) => {
              totals[row.category][0] += row.amount;
              if (row.vat) {
                totals[row.category][1] += row.amount / 6;
              }
            });

            return totals;
          }
          break;

        default:
          return {};
          break;
      }
    };

    const filterTotals = (monthlyTotals: DataNumber) => {
      const totalsOut = Object.fromEntries(
        Object.entries(monthlyTotals).filter(([_, [total, __]]) => total < -0.1)
      );

      const totalsIn = Object.fromEntries(
        Object.entries(monthlyTotals).filter(([_, [total, __]]) => total > 0.1)
      );

      return { totalsIn, totalsOut };
    };

    let monthlyData: DataNumber[] = [];
    Object.entries(selectedMonths).map(([key, rows]) => {
      const monthlyTotals = calculateTotals(rows);
      const { totalsIn, totalsOut } = filterTotals(monthlyTotals);
      monthlyData.push(totalsIn, totalsOut);
    });

    const [maxIn, maxOut] = getMaxInMaxOut(monthlyData);
    return { monthlyData, maxIn, maxOut };
  }, [selectedMonths, vizType]);

  // DEBUG
  console.log("Monthly = ", monthlyData);
  monthlyData[0] = {
    Incoming: [1, 0],
  };
  return (
    <>
      {monthlyData.map((categoryTotal, index) => (
        <BarChart
          data={categoryTotal}
          config={{
            offset: Math.floor(index / 2),
            maxValue: maxIn,
            minValue: maxOut,
            invertY: true,
          }}
        />
      ))}
    </>
  );
};

export default Visualisation;
