import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';
import Weather from './weather';
import WeatherForecast from './weatherForecast';
import DailyWeatherForecast from './dailyWeatherForecast';
import AnimatedHeaderText from './animatedText'


export default function App() {
  let [searchInput, setSearchInput] = useState("Kinshasa")
  let [location, setLocation] = useState("")
  let [dayWeather, setDayWeather] = useState({})
  let [response, setResponse] = useState("")
  let [forecastData, setForecastData] = useState("");
  let [myWeatherData, setMyWeatherData] = useState("")
  let dailyProjections = [];
  let apiKey = "08c521f87119714e709b4af5654ffa5c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  //let icon = `https://openweathermap.org/img/w/${dayWeather.weatherIcon}.png`;
  let limit = 1;
  let daysOfTheWeek = { 0 : 'Sun', 1 : 'Mon', 2 : 'Tue', 3 : 'Wed', 4 : 'Thur', 5: 'Fri', 6 : 'Sat'}
  let newDate = new Date()
  let hrs = newDate.getHours();
  let min = newDate.getMinutes();
  let sec = newDate.getSeconds();
  let f = 0
  let headerText = "Daily Weather Channel"
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
  

  function handleInput(){
    axios.get(url).then(setAspects)
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=metric`
    axios.get(url).then(populateForecasts)
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=${limit}&appid=${apiKey}`
    axios.get(apiUrl).then(updateLocale)

  }
  function handleSubmit(event){
    event.preventDefault(); 
    handleInput()
    event.target.reset()
    setSearchInput("")
  }
  
 
  function populateForecasts(response){
    console.log(response)
    let something = response.data.list
    setMyWeatherData(something)
    let i; let sectionedProjections; 
    for(i in response.data.list){
      if(i < 7){
        sectionedProjections = response.data.list[i]
        dailyProjections.push(sectionedProjections)
      }     
    }
    setForecastData(dailyProjections)
    
    }
  function updateLocale(response){
    console.log(response)
    setLocation(response.data[0].name)
    console.log(location)
    
  }
  function setAspects(response){
    console.log(response)
    setResponse(response)
    let newDay = newDate.getDay()
    let fullDate = daysOfTheWeek[newDay]+', ' + newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear();
    setDayWeather({
      time : currentTime,
      location : response.data.name,
      date : fullDate,
      lat : response.data.coord.lat,
      long : response.data.coord.lon,
      weatherIcon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      pressure: response.data.main.pressure,
      temperature: response.data.main.temp
    })
    
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
        let myLocale = response.data[0].name
        console.log(myLocale)
        setSearchInput(myLocale)
        let navigationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myLocale}&appid=${apiKey}&units=metric`;
        axios.get(navigationUrl).then(setAspects);
        let myUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${myLocale}&appid=${apiKey}&units=metric`
        axios.get(myUrl).then(populateForecasts)
        let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${myLocale}&limit=${limit}&appid=${apiKey}`
        axios.get(apiUrl).then(updateLocale)
        
        

    });
    });

    
    }
  
    useEffect(() => {
      handleInput()
    }, [])
  
  if(response){
    return (
      <div className="App"> 
        <div className="contain">
          <header className="App-header">
            <AnimatedHeaderText data={headerText}/>
          </header>
        <section className="Search-section">
          <form onSubmit={handleSubmit}>
            <input type="searchbar" className="search-bar" placeholder="Input a city" onChange={handleChange} />
            <input type="submit" className="search-submit" placeholder="Submit"/>
          </form>
          <input type="submit" className="current-location" value="Current" onClick={captureLocation}/>
        </section>
        <Weather data={dayWeather}/>
        <div className="dailyWeather">
            {Object.keys(forecastData).map(function (key, index) {
              return(
                <div key={index}>
                  <DailyWeatherForecast props={forecastData[index]}/>
                </div>
              )
              
            })}
        </div>
        <div className="weather-forecast">
              {Object.keys(myWeatherData).map((key, index) => {
                if(index === 8 | index === 16 | index === 24 |  index === 32 | index === 39){
                  return (
                    <div key={index}>
                      <WeatherForecast data={myWeatherData[index]}/>  
                    </div>
                    );
                }  
              })}
          </div>
    </div>
    <p className="link"> This project was coded by Monyonko and is open-sourced on <a href="https://github.com/monyonko/react-weather.git">Github</a> and hosted on <a href="https://react-weather-kappa-six.vercel.app/">Vercel</a>.</p>
    </div>
    );

   
    }
  
  else {
    return(
      <div className="App"> 

        <div className="contain">
        <header className="App-header">
          <AnimatedHeaderText data={headerText}/>
        </header>
        <section className="Search-section">
          <form onSubmit={handleSubmit}>
            <input type="searchbar" className="search-bar" placeholder="Input a city" onChange={handleChange} />
            <input type="submit" className="search-submit" placeholder="Submit"/>
          </form>
          <input type="submit" className="current-location" value="Current" onClick={captureLocation}/>
        </section>
        </div>
        <p className="link"> This project was coded by Monyonko and is open-sourced on <a href="https://github.com/monyonko/react-weather.git">Github</a> and hosted on <a href="https://react-weather-kappa-six.vercel.app/">Vercel</a>.</p>
        
        
      </div>
    )

  } }