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
  rows: DataRow[];
  loadCSVFile: (file: File) => void;
}

const useStore = create<DataState>((set) => ({
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

        set((state) => ({ rows: state.rows.concat(temp) }));
      },
    });
  },
}));

export default useStore;
