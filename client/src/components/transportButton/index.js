import React, { useState } from 'react';
import "../style/trannsportButton.css"

const TransportBtn = (props) => {
    const [transport, setTransport] = useState(props.transport)
    return (
        <div className='icon'>
            <img src={`/icons/${transport}-ico.svg`} alt={transport} />
        </div>
    );
};

export default TransportBtn;