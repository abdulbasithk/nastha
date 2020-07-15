import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'

import Logo from '../assets/logo.jpg'

const Navbar = () => {
    const history = useHistory()
    const [activeItem, setActiveItem] = useState('')
    const handleNavClick = (event, name, path) => {
        event.preventDefault()
        history.push(path)
        setActiveItem(name)
    }

  return (
    <Menu pointing id="top-menu">
    <Menu.Item>
      <Image src={Logo} size="mini"/>
    </Menu.Item>
    
    <Menu.Menu position='right'>
        <Menu.Item
        name='addEvent'
        active={activeItem === 'addEvent'}
        onClick={(event, { name }) => handleNavClick(event, name, '/')}
        content="+ Add Event"
        />
        <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={(event, { name }) => handleNavClick(event, name, '/home')}
        content="Home"
        />
        <Menu.Item
        name='dashboard'
        active={activeItem === 'dashboard'}
        onClick={(event, { name }) => handleNavClick(event, name, '/dashboard')}
        content="Dashboard"
        />
    </Menu.Menu>
  </Menu>
  )
}

export default Navbar;
