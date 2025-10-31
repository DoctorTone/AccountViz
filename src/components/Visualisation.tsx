import { useMemo } from "react";
import useStore from "../state/store";
import { BarChart } from "./BarChart";

const Visualisation = () => {
  const selectedRows = useStore((state) => state.selectedRows);
  const vizType = useStore((state) => state.vizType);

  if (!selectedRows.length) {
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

          for (let i = 0; i < selectedRows.length; ++i) {
            const amount = selectedRows[i].amount;
            const vat = selectedRows[i].vat;
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

          // DEBUG
          console.log("Totals = ", totals);
          Object.entries(totals).map(([key, [total, vat]]) => {
            console.log("Value = ", total, vat);
          });
          return totals;
        }
        break;

      case "Categories":
        {
          const totals = {
            Misc: [0, 0],
            Accountants: [0, 0],
            Consumables: [0, 0],
            "Web hosting": [0, 0],
            Subscriptions: [0, 0],
            "Training material": [0, 0],
            "Computer equipment": [0, 0],
          };

          selectedRows.forEach((row) => {
            totals[row.category][0] += row.amount;
          });

          return totals;
        }
        break;

      default:
        return {};
        break;
    }
  }, [selectedRows, vizType]);

  return (
    <>
      <BarChart data={categoryTotals} />
    </>
  );
};

export default Visualisation;
