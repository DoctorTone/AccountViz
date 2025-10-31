import { create } from "zustand";
import Papa from "papaparse";
import { type VizType } from "./Config";

type Expenses =
  | "Misc"
  | "Accountants"
  | "Consumables"
  | "Web hosting"
  | "Subscriptions"
  | "Training material"
  | "Computer equipment";

type DataRow = {
  id: number;
  date: string;
  transaction: string;
  amount: number;
  description: string;
  vat: boolean;
  category: Expenses;
};

interface DataState {
  showDropZone: boolean;
  dataLoaded: boolean;
  visualisationEnabled: boolean;
  currentMonth: string;
  setDataLoaded: (status: boolean) => void;
  rows: DataRow[];
  selectedRows: DataRow[];
  loadCSVFile: (file: File) => void;
  setRows: (data: DataRow[]) => void;
  updateRow: (row: DataRow) => void;
  saveSelectedRows: (data: DataRow[]) => void;
  vizType: VizType;
  setVisualisationType: (vizType: VizType) => void;
}

const useStore = create<DataState>((set) => ({
  showDropZone: true,
  dataLoaded: false,
  setDataLoaded: (status) => set({ dataLoaded: status }),
  rows: [],
  selectedRows: [],
  visualisationEnabled: false,
  currentMonth: "",
  loadCSVFile: (file) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        const temp: DataRow[] = data.map((row, index) => {
          // Convert to ISO date
          const year = row[0].slice(0, 4);
          const month = row[0].slice(4, 6);
          const day = row[0].slice(6);

          return {
            id: index + 1,
            date: new Date(`${year}-${month}-${day}`)
              .toUTCString()
              .slice(0, -13),
            transaction: row[6],
            amount: parseFloat(row[7]),
            description: row[8],
            vat: false,
            category: "Misc",
          };
        });

        set((state) => ({ rows: state.rows.concat(temp), dataLoaded: true }));
      },
    });
  },
  setRows: (data) => set(() => ({ rows: data })),
  updateRow: (row) =>
    set((state) => ({
      rows: state.rows.map((currentRow) =>
        currentRow.id === row.id ? { ...currentRow, ...row } : currentRow
      ),
    })),
  saveSelectedRows: (data) => {
    set(() => ({
      selectedRows: data,
      visualisationEnabled: true,
      showDropZone: false,
    }));
  },
  vizType: "Incomings",
  setVisualisationType: (visualisationType) =>
    set(() => ({ vizType: visualisationType })),
}));

export default useStore;
