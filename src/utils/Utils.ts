import { MONTHS, type DataRow } from "../state/Config";

export const sortMonthlyData = (data: DataRow[]) => {
  let date;
  let month;
  let year;
  let monthYear;
  let currentMonthYear = "";
  let monthData = [];
  let outputData = {};

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
