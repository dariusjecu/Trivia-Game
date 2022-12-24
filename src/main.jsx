import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <div>
        <div className='images'>
            <img className='first-img' src="../public/paint1.png" />
            <img className='second-img' src="../public/paint2.png" />
        </div>
        <App />
    </div>
)
