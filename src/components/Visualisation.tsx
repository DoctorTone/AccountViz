import { useMemo } from "react";
import useStore from "../state/store";
import { BarChart } from "./BarChart";
import { ExpensesList } from "../state/Config";

const Visualisation = () => {
  const currentSelection = useStore((state) => state.currentSelection);
  const selectedMonths = useStore((state) => state.selectedMonths);
  const vizType = useStore((state) => state.vizType);

  if (!currentSelection.length) {
    return null;
  }

  const monthlyData = useMemo(() => {
    const filterData = (rows) => {
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
    let monthlyData = [];
    Object.entries(selectedMonths).map(([key, rows]) => {
      const monthlyTotals = filterData(rows);
      monthlyData.push(monthlyTotals);
    });

    return monthlyData;
  }, [selectedMonths, vizType]);

  return (
    <>
      {monthlyData.map((categoryTotal, index) => (
        <BarChart data={categoryTotal} offset={index} />
      ))}
    </>
  );
};

export default Visualisation;
