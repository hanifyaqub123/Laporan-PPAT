import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = () => {
  return (
    <CDropdown
    inNav
    className="c-header-nav-items mx-2"
    direction="down"
  >
    <CDropdownToggle className="c-header-nav-link" caret={false}>
      <div >
        <CImg
          src='https://image.flaticon.com/icons/png/512/219/219986.png'
          style={{width:50,height:50, borderRadius:'50%', marginLeft:'40%', marginRight:'40%',marginBottom:'2%'}}
          alt="admin@bootstrapmaster.com"
        />
      </div>
    </CDropdownToggle>
    <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem
        header
        tag="div"
        color="light"
        className="text-center"
      >
        <strong>Settings</strong>
      </CDropdownItem>
      <CDropdownItem to='/logout'>
        <CIcon name="cil-settings" className="mfe-2" />Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>

  )
}

export default TheHeaderDropdown
