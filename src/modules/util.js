function convertToTwelveHourFormat(time, includeMinutes) {
  const timeArray = time.split(":");
  let hour = parseInt(timeArray[0]);
  const minutes = timeArray[1];
  const period = hour >= 12 && hour > 0 ? "PM" : "AM";

  if (period === "PM" || hour === 0) {
    if (hour != 12 && hour > 0) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
  }

  const formattedTime = includeMinutes
    ? `${hour}:${minutes}${period}`
    : `${hour}${period}`;
  return formattedTime;
}

function createHtmlElement(tag, classAttribute = "", text = "") {
  const element = document.createElement(tag);
  element.setAttribute("class", classAttribute);
  element.textContent = text;
  return element;
}

export { convertToTwelveHourFormat, createHtmlElement };
