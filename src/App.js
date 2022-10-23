import './App.css';
import { useState} from "react";
import axios from "axios";
import React from 'react';
//import Moment from 'react-moment';
//import moment from 'moment'
//import 'moment-timezone';



export default function App() {
  let [searchInput, setSearchInput] = useState(null)
  let [date, setDate] = useState("")
  let [location, setLocation] = useState("")
  let [country, setCountry] = useState("")
  let [lat, setLat] = useState("")
  let [long, setLong] = useState("")
  let [weatherIcon, setWeatherIcon] = useState("")
  let [description, setDescription] = useState("")
  let [temperature, setTemperature] = useState("")
  let [humidity, setHumidity] = useState("")
  let [wind, setWind] = useState("")
  let [pressure, setPressure] = useState("")
  //let [forecastedDay, setForecastedDay] = useState("")
  //let [forecastedIcon, setForecastedIcon] = useState("")
  //let [forecastedTemp, setForecastedTemp] = useState("")
  let apiKey = "08c521f87119714e709b4af5654ffa5c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  let icon = `https://openweathermap.org/img/w/${weatherIcon}.png`;
  let limit = 1;
  let daysOfTheWeek = { 0 : 'Sun', 1 : 'Mon', 2 : 'Tue', 3 : 'Wed', 4 : 'Thur', 5: 'Fri', 6 : 'Sat'}
  let right = document.getElementsByClassName('weather-forecast')[0]
  let newDate = new Date()
  let hrs = newDate.getHours();
  let min = newDate.getMinutes();
  let sec = newDate.getSeconds();
  let f = 0
  if (hrs < 10) {
    hrs = `${f}${hrs}`;
  }
  if (min < 10) {
    min = `${f}${min}`;
  }
  if (sec < 10) {
    sec = `${f}${sec}`;
  }

  let currentTime = hrs + ":" + min + ":" + sec;
  function getDayName(dateStr, locale){
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
  };


  function handleSubmit(event){
    event.preventDefault();
    axios.get(url).then(setAspects)
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=metric`
    axios.get(url).then(populateForecasts)

  }
  function populatingForecasts(input,response){
    let a = 0
    let i;
    setCountry(response.data.city.country)
    for(i in right){
      console.log(i)
      const fDate = document.getElementsByClassName("f-date-one")[a]
      const fTemp = document.getElementsByClassName("f-temp-one")[a]
      const forecastIconDiv = document.getElementsByClassName('f-icon')[a]
      let forecastDate; let forecastedIcon; let forecastTemp; let day; let separateDay; let formattedDay;
      function forecastedValues(response, input){
        day = ((response.data.list[input].dt_txt).split(" "))[0];
        separateDay = day.split('-')
        formattedDay = separateDay[1] + "/" + separateDay[2] + "/" + separateDay[0] 
        console.log(formattedDay)
        var forecastDate = getDayName(formattedDay, "en-US").slice(0,3)
        console.log(typeof forecastDate)
        console.log(forecastDate)
        forecastedIcon = response.data.list[input].weather[0].icon
        console.log(forecastedIcon)
        forecastTemp = response.data.list[input].main.temp
        console.log(forecastTemp)
        if( forecastIconDiv.length !== 0){
          forecastIconDiv.replaceChildren()
        }
        let forecastIcon = document.createElement("img")
        forecastIcon.src = `https://openweathermap.org/img/w/${forecastedIcon}.png`
        forecastIconDiv.appendChild(forecastIcon)
        console.log(forecastIconDiv)
        fDate.innerHTML = forecastDate;
        console.log(forecastDate)
        fTemp.innerHTML = `${forecastTemp}&degC`
      }
      
      if (input > 39){
        input--
        let tempInput = input;
        forecastedValues(response, tempInput)
        forecastDate = ((response.data.list[input].dt_txt).split(" "))[0];
        console.log(forecastDate)     
      }else {
        forecastedValues(response, input)
        input+=8  
        }
      a++
  }   
  }
  function populateForecasts(response){
    console.log(response)
    populatingForecasts(8,response)
 
}
  function updateLocale(response){
    console.log(response)
    setLocation(response.data[0].name)
  }
  function setAspects(response){
    console.log(response)
    let newDay = newDate.getDay()
    let fullDate = daysOfTheWeek[newDay]+', ' + newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear();
    let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=${limit}&appid=${apiKey}`
    axios.get(apiUrl).then(updateLocale)
    setDate(fullDate)
    setLat(response.data.coord.lat)
    setLong(response.data.coord.lon)
    setWeatherIcon(response.data.weather[0].icon)
    setDescription(response.data.weather[0].description)
    setHumidity(response.data.main.humidity)
    setWind(response.data.wind.speed)
    setPressure(response.data.main.pressure)
    setTemperature(response.data.main.temp)
  }
  function handleChange(event){
    setSearchInput(event.target.value)

  }
  function captureLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let reverseGeoCodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;
      axios.get(reverseGeoCodeUrl).then((response)=>{
        console.log(response)
        setSearchInput(response.data[0].name)
        axios.get(url).then(setAspects);

    });
    });
}
  return (
    <div className="App">  
      <header className="App-header">
        <a href="/#">Prev</a>
        <a href="/#">Next</a>
        <a href="/#">UI mode</a>
        <a href="/#">Background</a>
      </header>
      <section className="Search-section">
        <form onSubmit={handleSubmit}>
          <input type="searchbar" className="search-bar" placeholder="Input a city" onChange={handleChange} />
          <input type="submit" className="search-submit" placeholder="Submit"/>
        </form>
        <input type="submit" className="current-location" value="Current" onClick={captureLocation}/>
      </section>
      <section className="weather-results">
        <div>
          <p className="date-font">{date}</p>
          <p className="locale-font">{location},{country}</p>
          <p className="aspect-font">{lat}, {long}</p>
          <p className="aspect-font">{currentTime}</p>
          
        </div>
        <div className="temperature-section">
          <p>{temperature} °C</p>
        </div>
        <div>
          <p className="aspect-font">Humidity: {humidity} %</p>
          <p className="aspect-font">Wind: {wind} m/s</p>
          <p className="aspect-font">Pressure:{pressure} hPa</p>
          <img src={icon} alt="weather_icon"/>
          <p className="aspect-font description">{description}</p>
        </div>
      </section>
      <section className="weather-forecast">
        
        <div class="one">
        <p class="f-date-one aspect-font"></p>
        <div class="f-icon"></div>
        <p class="f-temp-one aspect-font"></p>
        </div>
        <div class="two">
        <p class="f-date-one aspect-font"></p>
        <div class="f-icon"></div>
        <p class="f-temp-one aspect-font"></p>
        </div>
        <div class="three">
        <p class="f-date-one aspect-font"></p>
        <div class="f-icon"></div>
        <p class="f-temp-one aspect-font"></p>
        </div>
        <div class="four">
        <p class="f-date-one aspect-font"></p>
        <div class="f-icon"></div>
        <p class="f-temp-one aspect-font"></p>
        </div>
        <div class="five">
          <p class="f-date-one aspect-font"></p>
          <div class="f-icon"></div>
          <p class="f-temp-one aspect-font"></p>
        </div>
        
      </section>
      
    </div>
  );
}
