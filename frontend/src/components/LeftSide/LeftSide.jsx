import React from 'react'
import Search from '../LogoSearch/Search'
import MenuIcons from '../MenuIcons/MenuIcons'
import './LeftSide.scss'
import Logo from '../../images/bird.jpg'


const LeftSide = () => {
  return (
    <div className='LeftSide'>
      {/* <Search /> */}
      <img src={Logo} alt='' style={{ height: '40px', width: '40px' }} />
      <MenuIcons />
    </div>
  )
}

export default LeftSide