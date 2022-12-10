let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;
let nowTime = document.querySelector("#currentTime");
nowTime.innerHTML = `${today} ${hour}:${minutes}`;

// information based on searched city

function search(response) {
  console.log(response);
  let oldCity = document.querySelector("#cities");
  let newCity = response.data.name;
  let temperatureOld = document.querySelector("#currentTemp");
  let temperatureNew = Math.round(response.data.main.temp);
  let descriptionOld = document.querySelector("#inwords");
  let descritionNew = response.data.weather[0].description;

  oldCity.innerHTML = newCity;
  temperatureOld.innerHTML = `${temperatureNew}˚C`;
  descriptionOld.innerHTML = descritionNew;
}

function citySearch(event) {
  event.preventDefault();
  let searchedLocation = document.querySelector("#input-location").value;
  console.log(searchedLocation);
  let apiKey = `c7b1d33e061028aef850af1929541b83`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&APPID=${apiKey}&units=metric`;
  axios.get(apiUrl).then(search);
}

// informtation based on current location

function searchLocal(response) {
  console.log(response);
  let oldCity = document.querySelector("#cities");
  let newCity = response.data.name;
  let temperatureOld = document.querySelector("#currentTemp");
  let temperatureNew = Math.round(response.data.main.temp);
  let descriptionOld = document.querySelector("#inwords");
  let descritionNew = response.data.weather[0].description;

  oldCity.innerHTML = newCity;
  temperatureOld.innerHTML = `${temperatureNew}˚C`;
  descriptionOld.innerHTML = descritionNew;
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  console.log(position);
  let apiKey = `c7b1d33e061028aef850af1929541b83`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(searchLocal);
}

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", getLocation);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", citySearch);
