/* eslint-disable react/no-unescaped-entities */
import "./App.css";
import Search from "../src/assets/search_icon.png";
import { useEffect, useState } from "react";
import normal from "../src/assets/sunny-weather.png"
import heavy_rain from "../src/assets/cloud-rain-weather.png"
import rain from "../src/assets/rain_Weather.png"
import snow from "../src/assets/snow_weather.png"
import windy from "../src/assets/windy_weather.png"
import night from "../src/assets/clear-night.png"
import heavy_moon_rain from "../src/assets/cloud-rain-weather.png"
import cloudly_moon from "../src/assets/cloudly_moon.png"
import rain_moon from "../src/assets/rain_moon.png"
import hum from "../src/assets/humidity_icon.jpg"
import wind_speed from "../src/assets/wind-speed-icon.png"
import axios from "axios";

function CoverContainer() {
    const [icon,setIcon]=useState(normal)
    const[city,setCity]=useState("chennai")
    const api="https://api.openweathermap.org/data/2.5/weather?"
    const apiKey="7625f8baca2d05d3a275ac135d638cbc"
    const [apiData,setApiData]=useState([])
    const weather_Icon={
     "01d":normal,
     "02d":windy,
     "03d":windy,
     "04d":windy,
     "09d":rain,
     "10d":rain,
     "11d":heavy_rain,
     "13d":snow,
     "50d":windy,
      "01n":night,
     "02n":cloudly_moon,
     "03n":cloudly_moon,
     "04n":cloudly_moon,
     "09n":rain_moon,
     "10n":rain_moon,
     "11n":heavy_moon_rain,
     "13n":snow,
     "50n":windy,
    }
    const getData=async()=>{
           const data=await axios.get(`${api}q=${city}&appid=${apiKey}&units=Metric`)
           setApiData(data)
           let icon_Time=data?.data?.weather?.[0]?.icon
setIcon(weather_Icon[icon_Time])
           return data
    }
    
    useEffect(()=>{
       const result=  getData()
       console.log(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[city])
    console.log(apiData,"apiData")
    const areaSearch=(e)=>{
      setCity(e.target.value||"chennai")
    }
    const areasSearch=(e)=>{
    if(e.key==="Enter"){
      setCity(e.target.value)
    }
    }
    
    
  return (
    <>
      <div className="cover">
        <div className="touch">
          <div className="search_container">
            <input
              id="area"
              name="area"
              placeholder="Enter Specified Area Name"
              className="inputFiled"
              onChange={(e)=>areaSearch(e)}
              onKeyDown={(e)=>areasSearch(e)}
            />
            <img src={Search} alt="search" width="20px" height="20px" className="search_icon"/>
          </div>
        </div>
        <div className="icon_box">
            <img src={icon} alt="icon" width="200px" height="200px"/>
            <div className="city">{city}</div>
            <div className="celsius">{Math.floor(apiData?.data?.main?.temp)}'C</div>
            <div className="country">{apiData?.data?.sys?.country}</div>
        </div>
        <div className="position">
          <div className="lat">
            <p>latitude</p>
            <p>{apiData?.data?.coord?.lat}</p>
          </div>
          <div className="long">
            <p>longitude</p>
            <p>{apiData?.data?.coord?.lon}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="humidity">
            <img src={hum} width="50px" height="50px"/>
            <p>{apiData?.data?.main?.humidity}</p>
          </div>
          <div className="wind-speed">
            <img src={wind_speed} width="50px" height="50px"/>
            <p>{apiData?.data?.wind?.speed}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoverContainer;
