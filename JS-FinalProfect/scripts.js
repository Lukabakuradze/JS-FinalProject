

document.getElementById('searchBtn').addEventListener('click', function () {
    let searchInput = document.getElementById('searchInput');
    let city = searchInput.value;
    fetchCityWeather(city, true);
});


const createMainView = (cityName, degree) => {

    let degreeSpan = document.getElementById('degree');
    degreeSpan.innerHTML = Math.round(degree) + '&#176';
    let citySpan = document.getElementById('city');
    citySpan.innerHTML = cityName;

    let dateSpan = document.getElementById('date');
    dateSpan.innerHTML = moment().format("dddd,MMM Do, YYYY");
}

const createWeatherDetailsView = (humidity, pressure, speed) => {
    let humiditySpan = document.getElementById('humidity');
    humiditySpan.innerHTML = humidity + "%";

    let pressureSpan = document.getElementById('pressure');
    pressureSpan.innerHTML = pressure ;

    let speedSpan = document.getElementById('speed');
    speedSpan.innerHTML = speed + " Km/h";
}


const fetchCityWeather = (cityName, addToHistory) => {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=e3f7e600451efbced453a95a6aab5ee4&units=metric', {
        method: 'GET'
    })
        .then(function (reponseText) {
            return reponseText.json();
        })
        .then(function (reponseData) {
            console.log(reponseData);
            const name = reponseData.name;
            const degree = reponseData.main.temp;
            createMainView(name, degree, date);

            
            const humidity = reponseData.main.humidity;
            const speed = reponseData.wind.speed;
            const pressure = reponseData.main.pressure;
            createWeatherDetailsView(humidity, pressure, speed);

            localStorage.setItem('currentCity', name);
            let searchHistory = localStorage.getItem('searchHistory') ? localStorage.getItem('searchHistory') : JSON.stringify([]);
            let searchArray = JSON.parse(searchHistory);


            if (addToHistory) {
                if (searchArray.length > 3) {
                    searchArray = searchArray.slice(-3);
                }
                searchArray.push(name);

                localStorage.setItem('searchHistory', JSON.stringify(searchArray));
            }

            createHistoryView();
        })
        .catch(function (error) {
            console.log(error);
        })
}


let currentCity = localStorage.getItem('currentCity') ? localStorage.getItem('currentCity') : 'Tbilisi';
fetchCityWeather(currentCity, false);

let searchHistory = localStorage.getItem('searchHistory') ? localStorage.getItem('searchHistory') : [];




function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const createHistoryView = () => {
    let searchHistory = localStorage.getItem('searchHistory') ? localStorage.getItem('searchHistory') : JSON.stringify([]);
    let searchArray = JSON.parse(searchHistory);
    let searchHistoryDiv = document.getElementById('searchHistory');

    removeAllChildNodes(searchHistoryDiv);

    searchArray.forEach(function (cityName) {
        let span = document.createElement('span');
        span.className = 'city-column';
        span.innerHTML = cityName;
        searchHistoryDiv.appendChild(span);
    })
}


createHistoryView();

