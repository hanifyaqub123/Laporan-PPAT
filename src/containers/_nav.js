import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
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
    _tag: 'CSidebarNavDropdown',
    name: 'Laporan PPAT',
    route: '/jualbeli',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Peralihan Jual Beli',
        to: '/jualbeli',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Peralihan Hibah',
        to: '/hibah',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Peralihan Tukar Menukar',
        to: '/tukarmenukar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Peralihan APHB',
        to: '/aphb',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'APHT',
        to: '/apht',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Nihil',
        to: '/nihil',
      }
    ],
    
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Keluar',
    to: '/logout',
    icon: <CIcon  name="cil-x-circle" customClasses="c-sidebar-nav-icon"/>,
  },
 
]

export default _nav
