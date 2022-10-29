import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import './weatherIcon.css'

export default function WeatherIcon(data){
    let iconCodes = {
        "01d" : 'CLEAR_DAY',
        "01n" : 'CLEAR_NIGHT',
        "02d" : 'PARTLY_CLOUDY_DAY' ,
        "02n" : 'PARTLY_CLOUDY_NIGHT' ,
        "03d" : 'PARTLY_CLOUDY_DAY' ,
        "03n" : 'PARTLY_CLOUDY_NIGHT' ,
        "04d" : 'CLOUDY',
        "04n" : 'CLOUDY',
        "09d" : 'RAIN',
        "09n" : 'RAIN',
        "10d" : 'RAIN',
        "10n" : 'RAIN',
        "11n" : 'RAIN',
        "11d" : 'RAIN',
        "13d" : 'SNOW',
        "13n" : 'SNOW',
        "50d" : 'FOG',
        "50n" : 'FOG'
      }
     
    return (
        <ReactAnimatedWeather className="animated-icon"
          icon={iconCodes[data.weatherData]}
          color='1e1e1e'
          size={32}
          animate={true}
        />
    )
}
