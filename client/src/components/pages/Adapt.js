import React, { useEffect } from 'react';

const Adapt = () => {
    const vibrate = ()=>{
        window.navigator.vibrate([700,300,700])
    }
    
    return (
        <div>       
            <button onClick={vibrate}>test</button>
        </div>
    );
};

export default Adapt;