import { create } from "zustand";
import Papa from "papaparse";
import { type VizType, MONTHS, type DataRow, COLOURS } from "./Config";
import { sortMonthlyData } from "../utils/Utils";

interface DataState {
  showDropZone: boolean;
  dataLoaded: boolean;
  visualisationEnabled: boolean;
  currentMonth: string;
  currentYear: number | null;
  setDataLoaded: (status: boolean) => void;
  rows: DataRow[];
  selectedRows: DataRow[];
  loadCSVFile: (file: File) => void;
  setRows: (data: DataRow[]) => void;
  updateRow: (row: DataRow) => void;
  saveSelectedRows: (data: DataRow[]) => void;
  selectedMonths: {
    [key: string]: DataRow[];
  };
  currentPeriod: string;
  selectNextMonth: () => void;
  selectPrevMonth: () => void;
  currentSelection: DataRow[];
  vizType: VizType;
  setVisualisationType: (vizType: VizType) => void;
  // Colours
  outgoingColour: string;
  incomingColour: string;
  VATColour: string;
  setOutColour: (colour: string) => void;
  setInColour: (colour: string) => void;
  setVATColour: (colour: string) => void;
  textScale: number;
  setTextScale: (scale: number) => void;
}

const useStore = create<DataState>((set, get) => ({
  // DEBUG
  showDropZone: false,
  dataLoaded: true,

  setDataLoaded: (status) => set({ dataLoaded: status }),
  rows: [],
  selectedRows: [],
  visualisationEnabled: false,
  currentMonth: "No data",
  currentYear: null,
  currentSelection: [],
  currentPeriod: "No data",
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
  selectedMonths: {},
  saveSelectedRows: (data) => {
    const date = new Date(data[0].date);
    const month = MONTHS[date.getMonth()];
    set(() => ({ currentMonth: month }));
    set(() => ({ currentYear: date.getFullYear() }));
    set(() => ({ currentPeriod: `${month} ${date.getFullYear()}` }));
    set(() => ({
      selectedRows: data,
      visualisationEnabled: true,
      showDropZone: false,
    }));
    const monthlyData = sortMonthlyData(data);
    set((state) => ({
      selectedMonths: monthlyData,
      currentSelection:
        monthlyData[`${state.currentMonth} ${state.currentYear}`],
    }));
  },
  selectNextMonth: () => {
    const selectedMonths = get().selectedMonths;
    const currentPeriod = get().currentPeriod;
    const keys = Object.keys(selectedMonths);
    let nextMonth = keys.indexOf(currentPeriod) + 1;
    if (nextMonth >= keys.length) {
      nextMonth = 0;
    }
    set(() => ({
      currentSelection: selectedMonths[keys[nextMonth]],
      currentPeriod: keys[nextMonth],
    }));
  },
  selectPrevMonth: () => {
    const selectedMonths = get().selectedMonths;
    const currentPeriod = get().currentPeriod;
    const keys = Object.keys(selectedMonths);
    let prevMonth = keys.indexOf(currentPeriod) - 1;
    if (prevMonth < 0) {
      prevMonth = keys.length - 1;
    }
    set(() => ({
      currentSelection: selectedMonths[keys[prevMonth]],
      currentPeriod: keys[prevMonth],
    }));
  },
  vizType: "Incomings",
  setVisualisationType: (visualisationType) =>
    set(() => ({ vizType: visualisationType })),
  // Colours
  outgoingColour: COLOURS.OUT,
  incomingColour: COLOURS.IN,
  VATColour: COLOURS.VAT,
  setOutColour: (colour) => set(() => ({ outgoingColour: colour })),
  setInColour: (colour) => set(() => ({ incomingColour: colour })),
  setVATColour: (colour) => set(() => ({ VATColour: colour })),
  textScale: 1,
  setTextScale: (scale) => set(() => ({ textScale: scale })),
}));

export default useStore;
