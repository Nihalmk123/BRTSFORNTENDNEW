import React from 'react'
import loader from '../Loaders/qr-code_12147210.gif'

const Loader = () => {
    return (
        <div>
            <img src={loader} alt="QR Scan" className="img-fluid" style={{ width: '40px', height: '40px' }} />
        </div>
    )
}

export default Loader