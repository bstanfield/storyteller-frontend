export const formatTime = (seconds) => {
  let days = 0;
  let hours = 0;
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = 0;

  if (seconds < 60) {
    minutes = 0;
    remainingSeconds = seconds;
  } else {
    minutes = Math.floor(seconds / 60);
    remainingSeconds = (seconds % 60) % 60;
  }

  if (minutes > 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(((minutes % 60) / 100) * 60);
    remainingSeconds = (seconds % 60) % 60;
  }

  if (remainingSeconds === 60) {
    remainingSeconds = 0;
  }

  let leadingSecond = 0;
  let leadingMinute = 0;
  let leadingHour = 0;

  if (Math.round(remainingSeconds) < 10) {
    leadingSecond = 0;
  }
  if (minutes < 10) {
    leadingMinute = 0;
  }
  if (hours < 10) {
    leadingHour = 0;
  }

  if (hours > 24) {
    days = hours / 24;
    return `${Math.floor(days)} day${days > 1 ? "s" : ""} and ${
      hours % 24
    } hour${hours > 1 ? "s" : ""}`;
  }

  return `${
    hours > 0 ? `${leadingHour}${hours} hour(s),` : ""
  } ${leadingMinute}${minutes} minutes, and ${leadingSecond}${Math.round(
    remainingSeconds
  )} seconds`;
};
