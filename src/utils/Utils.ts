import { MONTHS, type DataRow } from "../state/Config";

export const sortMonthlyData = (
  data: DataRow[]
): { [key: string]: DataRow[] } => {
  let date: Date;
  let month: string;
  let year: number;
  let monthYear: string;
  let currentMonthYear = "";
  let monthData: DataRow[] = [];
  const outputData: { [key: string]: DataRow[] } = {};

  for (let i = 0; i < data.length; ++i) {
    date = new Date(data[i].date);
    month = MONTHS[date.getMonth()];
    year = date.getFullYear();
    monthYear = `${month} ${year}`;
    if (monthYear != currentMonthYear) {
      if (monthData.length) {
        outputData[currentMonthYear] = monthData;
        monthData = [];
      }
      currentMonthYear = monthYear;
    }
    monthData.push(data[i]);
  }
  outputData[currentMonthYear] = monthData;

  return outputData;
};
