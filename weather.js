let server = 'https://api.weatherapi.com/v1/current.json?key=eb7da8f3bdfe47f78b595444222205&q=Moscow&aqi=yes';
const select = document.querySelector('.select');
  select.addEventListener('change', (e) => {
    server = select.value;
    loadWeather(server);
    setTimeout(async function updateWeather() {
      await loadWeather(server);
      setTimeout(updateWeather, 1800000);
    }, 1800000);
  });

async function loadWeather(api) {
  const response = await fetch(api);
    if (response.ok) {
      let responseAnswer = await response.json();
      console.log(responseAnswer);
      weatherBlock(responseAnswer);
    } else {
      alert("Failed loading weather: " + response.status);
    }
}

function weatherBlock(data) {
  let wrapper = document.querySelector('.wrapper');
  let weather__city = wrapper.querySelector('.weather__city');
  let weather__status = wrapper.querySelector('.weather__status');
  let weather__temp = wrapper.querySelector('.weather__temp');
  let weather__feelsLike = wrapper.querySelector('.weather__feels-like');
  let weatherIconImage = wrapper.querySelector('.weather__icon-image');

  const location = data.location.name;
  const temp = Math.round(data.current.temp_c);
  const feelsLike = Math.round(data.current.feelslike_c);
  const weatherStatus = data.current.condition.text;
  const weatherIcon = data.current.condition.icon;
  const weatherIconId = `${weatherIcon}`;
  const weatherCode = data.current.condition.code;

  weather__city.textContent = location;
  weather__status.textContent = weatherStatus;
  weather__temp.innerHTML = temp + `&deg;`;
  weather__feelsLike.innerHTML = `Feels like: ` + feelsLike + `&deg;`;
  weatherIconImage.src = weatherIconId;
  
  if (weatherCode == 1180 || 1183 || 1186 || 1189 || 1192 || 1195 || 1198|| 1201) {
    wrapper.style.backgroundImage = "url('https://acegif.com/wp-content/uploads/rainy-10.gif')"
  }
  if  (weatherCode == 1003 || 1006) {
    wrapper.style.backgroundImage = "url('https://q-in.ru/wp-content/uploads/2020/01/oblaka.gif')";
  }
  if (weatherCode == 1273 || 1276 || 1279 || 1282) {
    wrapper.style.backgroundImage = "url('https://i.gifer.com/76zx.gif')";
  }
  if (weatherCode == 1150 || 1153 || 1169 || 1171) {
    wrapper.style.backgroundImage = "url('https://i.gifer.com/7sd1.gif')";
  }
  if (weatherCode == 1210 || 1213 || 1216 || 1219 || 1222 || 1225) {
    wrapper.style.backgroundImage = "url('https://i.gifer.com/embedded/download/5yo.gif')";
  }
  if (weatherCode == 1000) {
    wrapper.style.backgroundImage = "url('https://i.gifer.com/origin/45/454ba38b4ce5b3fdc8796ed710769e69.gif')";
  }
  if (weatherCode == 1135) {
    wrapper.style.backgroundImage = "url('https://i.gifer.com/T2v6.gif')";
  }
}

loadWeather(server);

setTimeout(async function updateWeather() {
  await loadWeather(server);
  setTimeout(updateWeather, 1800000);
}, 1800000);


