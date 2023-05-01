import moment from "moment-timezone";

export const validateDate = (dateStr) => {
  const globalTimezone = "Etc/UTC"; // Set your desired timezone here
  const inputDate = moment.tz(dateStr, globalTimezone);
  const tomorrowDate = moment().add(1, "day").startOf("day").tz(globalTimezone);
  if (inputDate.isAfter(tomorrowDate)) {
    alert("Input date is in the future. Only today's & past dates are valid.");
    return false;
  }
  return true;
};
