import React from 'react'
import beekLogo from '../assets/statics/beek-logo.png'

const Header = () => (
    <header className='header container'>
        <img className='header__img' src={beekLogo} alt="beek logo"/>
    </header>
)

export default Header