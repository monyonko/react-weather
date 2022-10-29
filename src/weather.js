import React from 'react'
import WeatherIcon from './weatherIcon'

export default function Weather(props){
    console.log(props)
    let date = props.data.date;
    let location = props.data.location;
    let lat = props.data.lat;
    let long = props.data.long;
    let description = props.data.description;
    let weatherIcon = props.data.weatherIcon;
    let temp = props.data.temperature;
    let humidity = props.data.humidity;
    let wind = props.data.wind;
    let pressure = props.data.pressure;
    
   
    return(
        <div className="day-weather">
            <div className="left">
                <p className="second-class-aspects">{date}</p>
                <p className="aspect">{location}</p>
                <p className="aspect">{lat},{long}</p>
                <p className="aspect">{description}</p>
                
                <span className="icon-temp">                    
                    <WeatherIcon className="day-icon" weatherData={weatherIcon}/>
                    <p className="temp">{temp}°C</p>
                </span>
            </div>
            <div className="right">
                <div className="right-aspects">
                    <p className="aspect">Humidity : {humidity} %</p>
                    <p className="aspect">Wind : {wind} m/s</p>
                    <p className="aspect">Pressure : {pressure} kPa</p>
                </div>
                
            </div>
            
           
        </div>
    )
}