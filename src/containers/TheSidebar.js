import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {useHistory} from 'react-router-dom'

// sidebar nav config
import navigation from './_nav'
import navigation1 from './_nav1'

const TheSidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const user = JSON.parse(localStorage.getItem("user"));
  const [navigationPass,setNavigation] = useState('')


  React.useEffect(()=>{
    // alert(user)
    if (user === null) {
        history.push('/login')
        setNavigation(navigation)
    } else if (user[0].status === "admin") {
      history.push('/dashboard')
      setNavigation(navigation1)
    }else{
      setNavigation(navigation)
    }
  },[])
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/dashboard">
        <CIcon
          className="c-sidebar-brand-full"
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Logo_BPN-KemenATR_%282017%29.png"
          // height={70}
          style={{height:150,width:110, paddingBottom:'5%', paddingTop:'5%'}}
        />
    
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigationPass}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
