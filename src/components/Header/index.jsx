import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CloseIcon, MenuIcon, SettingsIcon, BellIcon, HelpIcon } from '../Icons'
import CompanyLogo from '../../assets/media/company-logo.svg?react'
import userAvatar from '../../assets/media/checker-avatar.png'
import MENU_ITEMS from '../../constants'

function Header({ activeNav, setActiveNav }) {
  const [openNav, setOpenNav] = useState(false)

  const isActiveClass =
    'text-primary hover:text-primary md:border-r-2 md:border-r-primary'

  const toggleNavBar = () => setOpenNav(!openNav)
  const handleNavClick = (itemName) => {
    setActiveNav(itemName)
  }

  useEffect(() => {
    const closeNavBarIfOpenForLargeScreens = () => {
      if (window.innerWidth > 1024 && openNav) setOpenNav(false)
    }

    window.addEventListener('resize', closeNavBarIfOpenForLargeScreens)

    return () => {
      window.removeEventListener('resize', closeNavBarIfOpenForLargeScreens)
    }
  }, [openNav])

  return (
    <header className="flex items-center h-20 bg-white">
      <div className="flex items-center justify-between w-full">
        <nav
          className={`absolute z-50 lg:w-[var(--sidebar-width)] lg:h-[calc(100%-var(--header-height))] lg:top-20 lg:flex lg:flex-col lg:justify-between md:max-lg:pr-6 lg:rounded-none lg:shadow-none left-0 w-full py-4 bg-white rounded-bl-[10px] rounded-br-[20px] shadow ${
            openNav ? 'top-[82px]' : '-top-full'
          }`}
        >
          <ul>
            {MENU_ITEMS.map((item) => (
              <li
                key={item.name.toLowerCase()}
                className={`flex gap-2 cursor-pointer h-11 font-medium items-center px-6 py-2 border-r-transparent border-r-2 ${
                  activeNav === item.name
                    ? isActiveClass
                    : 'text-blue-gray hover:text-gray-darkest'
                }`}
                onClick={() => handleNavClick(item.name)}
              >
                {item.icon}
                <span>{item.name}</span>

                {item.isNew && (
                  <span className="ml-auto text-xs font-semibold uppercase text-red-lightest">
                    New
                  </span>
                )}
              </li>
            ))}

            <hr className="bg-gray-bg h-[1px] mx-6 my-2" />
            <li
              className={`flex gap-2 cursor-pointer font-medium items-center px-6 py-2 ${
                activeNav === 'Settings'
                  ? isActiveClass
                  : 'text-blue-gray hover:text-gray-darkest'
              }`}
              onClick={() => handleNavClick('Settings')}
            >
              <SettingsIcon />
              <div>Settings</div>
            </li>
          </ul>

          <div className="hidden px-6 py-4 lg:block">
            <CompanyLogo />
          </div>
        </nav>

        <div
          className={`md:hidden ml-4 flex items-center cursor-pointer justify-center h-10 w-10 rounded-full border border-gray-bg ${
            openNav ? 'bg-primary' : 'bg-white'
          }`}
          onClick={toggleNavBar}
        >
          {openNav ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className={`hidden md:block md:w-[var(--sidebar-width)] md:px-4`}>
          <img src="/app-logo.png" alt="App logo" />
        </div>
        <div
          className={`flex lg:justify-between px-4 items-center gap-3 pr-4 lg:w-[calc(100%-var(--sidebar-width))] lg:bg-primary lg:h-[var(--header-height)] lg:text-white`}
        >
          <div className="hidden lg:block">
            <div className="font-medium">Hello, Ekemini</div>
            <div className="text-xs font-normal">Tue, 13 February 2024</div>
          </div>
          <div className="flex gap-2">
            <div className="hidden p-3 bg-white rounded-full lg:block">
              <BellIcon />
            </div>
            <div className="hidden p-3 bg-white rounded-full lg:block">
              <HelpIcon />
            </div>
            <div className="ml-6 text-right">
              <div className="mb-1 font-medium">Ekemini Mark</div>
              <div className="text-xs">Heaps Normal</div>
            </div>
            <img src={userAvatar} alt="user avatar" className="w-10 h-10" />
          </div>

          <div
            className={`hidden md:max-lg:flex items-center cursor-pointer justify-center h-10 w-10 rounded-full border border-gray-bg ${
              openNav ? 'bg-primary' : 'bg-white'
            }`}
            onClick={toggleNavBar}
          >
            {openNav ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  activeNav: PropTypes.string.isRequired,
  setActiveNav: PropTypes.func.isRequired
}

export default Header
