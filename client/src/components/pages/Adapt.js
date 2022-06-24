import React, { useEffect, useState } from 'react';
import TransportBtn from '../transportButton';
import "../style/adapt.css"


const Adapt = () => {

    // const [arrets, setArrets] = useState([])
    const arrets = {
        "stops":
            [
                {"name": "Tente fond", "Latitude": 50.601759, "Longitude": 3.510466},
                {"name": "Maker Lab", "Latitude": 50.601767, "Longitude": 3.510722},
                {"name": "Point info", "Latitude": 50.601324, "Longitude": 3.511161},
                {"name": "Entrée", "Latitude": 50.601096, "Longitude": 3.511567}
            ]
        
    }
    const vibrate = ()=>{
        window.navigator.vibrate([700,300,700])
    }
    
    // useEffect(()=>{
    //     fetch('https://static.tectime.be/stops?all=true')
    //     .then(response => response.json())
    //     .then(data => setArrets(data.StopsResult));
    // },[])
    return (
        <>
            <div className='box-transport-method'>       
                <TransportBtn transport={"bus"} bgColor={"#FFE046"}/>
                <TransportBtn transport={"train"} bgColor={"#338CF1"}/>
                <TransportBtn transport={"pied"} bgColor={"#F83340"}/>
                <TransportBtn transport={"tram"} bgColor={"#30F680"}/>
            </div>

            <div className="choice-stops">
                <input list="stops" id='search'/>

                <datalist id='stops'>
                    {
                       arrets.stops.map((arret, i)=> <option value={arret.name} key={i}/>)         
                    }
                </datalist>
            </div>
        </>
    );
};

export default Adapt;