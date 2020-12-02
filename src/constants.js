export const TIMES = {};

function fillTimes() {
  for (let i = 1; i < 12; i++) {
    TIMES[`${i}AM`] = `${i}:00 AM`;
  }
  TIMES[`12PM`] = `12:00 PM`;

  for (let i = 1; i < 12; i++) {
    TIMES[`${i}PM`] = `${i}:00 PM`;
  }
  TIMES[`12AM`] = `12:00 AM`;
}
fillTimes();

export const DAYS = {
  SUNDAY: "sunday",
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
};