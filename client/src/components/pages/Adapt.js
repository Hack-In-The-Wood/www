import React, { useEffect, useState } from 'react';
import TransportBtn from '../transportButton';
import "../style/adapt.css"


const Adapt = () => {

	// const [arrets, setArrets] = useState([])
	const [arret, setArret] = useState("")
	const [dist, setDist] = useState()

	const arrets = {
		"stops":
			[
				{"name": "Tente fond", "Latitude": 50.601759, "Longitude": 3.510466},
				{"name": "Maker Lab", "Latitude": 50.601767, "Longitude": 3.510722},
				{"name": "Point info", "Latitude": 50.601324, "Longitude": 3.511161},
				{"name": "Entrée", "Latitude": 50.601096, "Longitude": 3.511567}
			]
		
	}

	function distance(lat1, lon1, lat2, lon2) {
		var R = 6378.137; var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
		var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); var d = R * c;
		return Math.floor(d * 1000);
	}

	const vibrate = ()=>{
		window.navigator.vibrate([700,300,700])
	}

	const handleArrets = (e)=>{
		setArret(e.target.value)
	}

	  function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(showPosition, err=>{console.log(err)},  { enableHighAccuracy: true, maximumAge: 100, timeout: 500000 });
		} else { 
		  return false
		}
	  }

	  function showPosition(position) {
		const location = arrets.stops.find((spot)=> spot.name === arret)

		if(location === undefined) return

		const long = distance(position.coords.latitude,position.coords.longitude, location.Latitude, location.Longitude)
		document.getElementById('test').innerText = `${position.coords.latitude} ET ${position.coords.longitude}`
		
		if(long <= 7){
			vibrate()
		}      
	  }
	
	// useEffect(()=>{
	//     fetch('https://static.tectime.be/stops?all=true')
	//     .then(response => response.json())
	//     .then(data => setArrets(data.StopsResult));
	// },[])

	return (
		<>
			<div className='box-transport-method'>       
				<TransportBtn transport={"pied"} bgColor={"linear-gradient(#fd626c,#F83340)"}/>
				<TransportBtn transport={"bus"} bgColor={"linear-gradient(#FFE046,#ffc600)"}/>
				<TransportBtn transport={"tram"} bgColor={"linear-gradient(#30D680,#00c94c)"}/>
				<TransportBtn transport={"train"} bgColor={"linear-gradient(#338CF1,#0b60c1)"}/>
			</div>
			   <div className="choice-stops">
					<svg className='choise-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
					<input list="stops" id='search' onChange={handleArrets}/>
				<datalist id='stops'>
					{
					   arrets.stops.map((arret, i)=> <option value={arret.name} key={i}/>)         
					}
				</datalist>
				{/* <span className='dist'>{dist}</span> */}
				<span className='dist' id="test"></span>
			</div>
			<div className='start-button'>
				<button onClick={getLocation}>COMMENCER</button>
			</div>
		</>
	);
};

export default Adapt;