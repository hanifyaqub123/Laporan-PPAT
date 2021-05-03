import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav1 =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Keluar',
    to: '/logout',
    icon: <CIcon  name="cil-x-circle" customClasses="c-sidebar-nav-icon"/>,
  },
 
]

export default _nav1
