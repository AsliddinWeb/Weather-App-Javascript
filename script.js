const api = {
    key: "d4dcea441c7854733b473eb3d815ea45",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery)

function setQuery (e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value)
        console.log(searchBox.value);
    }
}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults (weather) {
    console.log(weather);

    let city = document.querySelector(".city");
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    let now = new Date()
    let date = document.querySelector(".date")
    date.textContent = dataBuilder(now)

    let temp = document.querySelector(".temp")
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)} °c / ${Math.round(weather.main.temp_max)} °c`;
}

function dataBuilder (a) {
    let months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentyabr",
        "Oktyabr",
        "Noyabr",
        "Dekabr"
    ];

    let days = [
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba",
        "Yakshanba"
    ];

    let day = days[a.getDay() - 1];
    let date = a.getDate();
    let month = months[a.getMonth()];
    let year = a.getFullYear();

    return `${day}, ${date}-${month} ${year}-yil.`
}