import React from "react";
import WeatherIcon from './weatherIcon'
import './dailyWeather.css'


export default function DailyWeatherForecast(props){
    let day = (((props.props.dt_txt).split(" "))[1]).slice(0,-3)
    let temp = props.props.main.temp
    let icon = props.props.weather[0].icon
    
    return(
        <div className="dailyWeatherBlock">
           <p className="dailyAspect">{day}</p>
           <WeatherIcon weatherData={icon}/>
           <p className="dailyAspect">{temp}</p>
        </div>
    )
}