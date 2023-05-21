export const bringNowDates = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let days2 = now.getDate();

  if (month + 1 < 10) {
    month = "0".concat(String(month + 1));
  }
  if (days2 < 10) {
    days2 = "0".concat(String(days2));
  }

  let dates = `${year}.${month}.${days2}`;
  return dates;
};
