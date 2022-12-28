import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import First from "../public/paint1.png"
import Second from "../public/paint2.png"

ReactDOM.createRoot(document.getElementById('root')).render(
    <div>
        <div className='images'>
            <img className='first-img' src={First} />
            <img className='second-img' src={Second} />
        </div>
        <App />
    </div>
)
