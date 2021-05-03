import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  let myCurrentDate = new Date()
  let year = myCurrentDate.getFullYear();
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.instagram.com/kantahkotasalatiga/" target="_blank" rel="noopener noreferrer">ALPHA</a>
        <span className="ml-1">&copy; {year} PPAT Kota Salatiga</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.instagram.com/kantahkotasalatiga/" target="_blank" rel="noopener noreferrer">BPN Kota Salatiga</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
