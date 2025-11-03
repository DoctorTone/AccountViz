import { useMemo } from "react";
import useStore from "../state/store";
import { BarChart } from "./BarChart";
import { ExpensesList } from "../state/Config";

const Visualisation = () => {
  const currentSelection = useStore((state) => state.currentSelection);
  const vizType = useStore((state) => state.vizType);

  if (!currentSelection.length) {
    return null;
  }

  const categoryTotals = useMemo(() => {
    switch (vizType) {
      case "Incomings":
        {
          const totals = {
            Incoming: [0, 0],
            Outgoing: [0, 0],
          };

          for (let i = 0; i < currentSelection.length; ++i) {
            const amount = currentSelection[i].amount;
            const vat = currentSelection[i].vat;
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

          currentSelection.forEach((row) => {
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
  }, [currentSelection, vizType]);

  return (
    <>
      <BarChart data={categoryTotals} />
    </>
  );
};

export default Visualisation;
