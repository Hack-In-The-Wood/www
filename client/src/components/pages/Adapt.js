import React, { useEffect } from 'react';
import TransportBtn from '../transportButton';
import "../style/adapt.css"

const Adapt = () => {
    const vibrate = ()=>{
        window.navigator.vibrate([700,300,700])
    }
    
    return (
        <div className='box-transport-method'>       
            <TransportBtn transport={"bus"} bgColor={"#FFE046"}/>
            <TransportBtn transport={"train"} bgColor={"#338CF1"}/>
            <TransportBtn transport={"pied"} bgColor={"#F83340"}/>
            <TransportBtn transport={"tram"} bgColor={"#30F680"}/>
        </div>
    );
};

export default Adapt;