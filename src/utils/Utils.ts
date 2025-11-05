import { MONTHS, type DataRow, type DataNumber } from "../state/Config";

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

export const getMaxInMaxOut = (data: DataNumber[]) => {
  let maxIn = 0;
  let maxOut = 0;

  for (let i = 0; i < data.length; ++i) {
    Object.entries(data[i]).map(([_, [total, __]]) => {
      if (total < maxOut) {
        maxOut = total;
      }
      if (total > maxIn) {
        maxIn = total;
      }
    });
  }

  return [maxIn, maxOut];
};
