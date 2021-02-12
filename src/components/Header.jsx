import React from 'react'
import beekLogo from '../assets/statics/beek-logo.png'
import Container from 'react-bootstrap/Container'

const Header = () => (
    <Container>
        <header className='header'>
            <img className='header__img' src={beekLogo} alt="beek logo"/>
        </header>
    </Container>
)

export default Header