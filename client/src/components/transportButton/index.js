import React, { useState } from 'react';
import "../style/transportButton.css"

const TransportBtn = (props) => {
    const [transport, setTransport] = useState(props.transport)
    return (
        <div className='icon'>
            <img src={`/icons/${transport}-ico.svg`} alt={transport} />
        </div>
    );
};

export default TransportBtn;