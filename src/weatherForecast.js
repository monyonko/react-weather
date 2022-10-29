import React from 'react'
import WeatherIcon from './weatherIcon'
import './weatherForecast.css'

export default function WeatherForecast(props){
    console.log(props)
    console.log(props.data.main.temp_max)
    console.log(props.data.main.temp_min)
    function day(){
        let myDate = new Date(props.data.dt * 1000)
        let myDay = myDate.getDay()
        let myDays = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]
        return myDays[myDay]
    }
    let date = day()
    let max_temp = props.data.main.temp_max
    let min_temp = props.data.main.temp_min
    let icon = props.data.weather[0].icon
    
    return (
        <div>
            
            <div className="forecast-individual-section">
                <p className="forecast-aspects">{date}</p>
                <WeatherIcon weatherData={icon}/>
                <span className="temp-section">
                    <p className="forecast-min-temp forecast-aspect left">{max_temp}</p>
                    <p className="forecast-max-temp forecast-aspect">{min_temp}</p>
                    
                </span>
            </div>
        </div>
        
    )
}