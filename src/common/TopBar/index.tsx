'use client'
import LogoBox from '@/common/HorizontalNav/LogoBox'
import IconifyIcon from '@/wrappers/IconifyIcon'
import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import LeftSideBarToggle from './components/LeftSideBarToggle'
import Notifications from './components/Notifications'
import ProfileDropdown from './components/ProfileDropdown'
import SearchBox from './components/SearchBox'
import ThemeCustomizeToggle from './components/ThemeCustomizeToggle'
import ThemeModeToggle from './components/ThemeModeToggle'
import { usePathname } from 'next/navigation'
import EmpezarEventoButton from '@/components/EmpezarEventoButton'
import { EventoProvider } from '@/context/useEventoContext'

const TopBar = () => {

  const navbarRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    window.addEventListener('scroll',
      () => {
        if (navbarRef.current) navbarRef.current.classList.toggle('topbar-active', window.scrollY > 100)
      }
    )
  }, [])

  const pathname = usePathname();

  const [title, setTitle] = useState<string>('Welcome')

  useEffect(() => {
    setTitle(document.title.split("|")[0])

  }, [pathname])

  return (
    <header ref={navbarRef} className={`app-topbar `} id="header">
      <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <LogoBox />
          <LeftSideBarToggle />
          <div className="topbar-item d-none d-md-flex px-2">
            <div>
              <h4 className="page-title fs-20 fw-semibold mb-0">{title}</h4>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          {/* <SearchBox /> */}
          {/* <Notifications /> */}
          <EventoProvider>
            <EmpezarEventoButton 
              onEventoCreado={()=>{}} 
              className={'btn-soft-primary rounded-pill'} 
              label={'Crear evento'}
            />
          </EventoProvider>
          <div className="topbar-item d-flex d-xs-none">  
            <ThemeCustomizeToggle />
            <ThemeModeToggle />
          </div>
          <ProfileDropdown />



        </div>
      </div>
    </header>
  )
}

export default TopBar