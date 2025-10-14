import { create } from "zustand";
import Papa from "papaparse";

type DataRow = {
  id: number;
  date: string;
  transaction: string;
  amount: number;
  description: string;
};

interface DataState {
  dataLoaded: boolean;
  setDataLoaded: (status: boolean) => void;
  rows: DataRow[];
  selectedRows: DataRow[];
  loadCSVFile: (file: File) => void;
  saveSelectedRows: (data: DataRow[]) => void;
}

const useStore = create<DataState>((set) => ({
  dataLoaded: false,
  setDataLoaded: (status) => set({ dataLoaded: status }),
  rows: [],
  selectedRows: [],
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

          console.log("Date = ", year, month, day);

          return {
            id: index + 1,
            date: new Date(`${year}-${month}-${day}`)
              .toUTCString()
              .slice(0, -13),
            transaction: row[6],
            amount: parseFloat(row[7]),
            description: row[8],
          };
        });

        set((state) => ({ rows: state.rows.concat(temp), dataLoaded: true }));
        // DEBUG
        console.log("Data", data);
      },
    });
  },
  saveSelectedRows: (data) => set(() => ({ selectedRows: data })),
}));

export default useStore;
