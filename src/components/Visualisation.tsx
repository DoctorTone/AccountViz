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
            in: 0,
            out: 0,
          };

          for (let i = 0; i < selectedRows.length; ++i) {
            const amount = selectedRows[i].amount;
            if (amount < 0) {
              totals.out += amount;
            } else {
              totals.in += amount;
            }
          }

          return totals;
        }
        break;

      case "Categories":
        {
          const totals = {
            Misc: 0,
            Accountants: 0,
            Consumables: 0,
            "Web hosting": 0,
            Subscriptions: 0,
            "Training material": 0,
            "Computer equipment": 0,
          };

          selectedRows.forEach((row) => {
            totals[row.category] += row.amount;
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
