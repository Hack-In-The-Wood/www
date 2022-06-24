import React, { useEffect } from 'react';
import TransportBtn from '../transportButton';

const Adapt = () => {
    const vibrate = ()=>{
        window.navigator.vibrate([700,300,700])
    }
    
    return (
        <div className='box-transport-method'>       
            <TransportBtn transport={"bus"}/>
            <TransportBtn transport={"train"}/>
            <TransportBtn transport={"pied"}/>
            <TransportBtn transport={"tram"}/>
        </div>
    );
};

export default Adapt;