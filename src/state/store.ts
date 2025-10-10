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
  loadCSVFile: (file: File) => void;
}

const useStore = create<DataState>((set) => ({
  dataLoaded: false,
  setDataLoaded: (status) => set({ dataLoaded: status }),
  rows: [],
  loadCSVFile: (file) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        const temp: DataRow[] = data.map((row, index) => ({
          id: index + 1,
          date: row[0],
          transaction: row[6],
          amount: parseFloat(row[7]),
          description: row[8],
        }));

        set((state) => ({ rows: state.rows.concat(temp), dataLoaded: true }));
      },
    });
  },
}));

export default useStore;
