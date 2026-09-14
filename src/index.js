import { render } from "./modules/render.js";
import "./styles.css";

const DEFAULT = {
  location: "San Francisco, California",
  region: "us",
};

const locationInput = document.getElementById("location-input");
const submitButton = document.getElementById("submit-button");
const unitToggle = document.getElementById("unit-toggle");
let unitRegion = unitToggle.checked ? "metric" : "us";
let tempUnit = unitToggle.checked ? "C" : "F";
let distanceUnit = unitToggle.checked ? "km/h" : "mph";

render(DEFAULT.location, DEFAULT.region, tempUnit, distanceUnit);

submitButton.addEventListener("click", () => {
  unitRegion = unitToggle.checked ? "metric" : "us";
  tempUnit = unitToggle.checked ? "C" : "F";
  distanceUnit = unitToggle.checked ? "km/h" : "mph";

  const location = locationInput.value || DEFAULT.location;

  render(location, unitRegion, tempUnit, distanceUnit);
});

unitToggle.addEventListener("change", () => {
  unitRegion = unitToggle.checked ? "metric" : "us";
  tempUnit = unitToggle.checked ? "C" : "F";
  distanceUnit = unitToggle.checked ? "km/h" : "mph";

  const location = locationInput.value || DEFAULT.location;

  render(location, unitRegion, tempUnit, distanceUnit);
});
