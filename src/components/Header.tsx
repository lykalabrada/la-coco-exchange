import React from 'react'
import useCurrentTime from '../hooks/useCurrentTime'

const Header = () => {
    const time = useCurrentTime()

    return (
        <header className='header'>
            <img src={'/crypto.svg'} className='header--image' alt='La Coco Logo' />
            <h2 className='header--title'>La Coco Crypto Exchange</h2>
            <h3 className='header--datetime'>{time}</h3>
        </header>
    )
}

export default Header