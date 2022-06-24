import React, { useEffect } from 'react';

const Adapt = () => {
    const isMobile = ()=>{
        const nav = navigator.userAgent.toLowerCase();
        return (
            nav.match(/iphone/i) || nav.match(/ipod/i) || nav.match(/ipad/i) || nav.match(/android/i)
        );
    }
    
    return (
        <div>
            {isMobile() && window.navigator.vibrate(1000)}
            Cette est page est la page des personnes avec un soucis de vue
        </div>
    );
};

export default Adapt;