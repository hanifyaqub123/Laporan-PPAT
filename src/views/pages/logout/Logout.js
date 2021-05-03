import React,{useState} from 'react'
import {
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
  } from '@coreui/react'
import {  useHistory } from 'react-router-dom'

const Logout = () => {
    
    const history = useHistory();
    const [modal, setModal] = useState(true);

  const toggle = ()=>{
    setModal(!modal);
    history.push('/dashboard');
  }

  const toggleKeluar = ()=>{
    setModal(!modal);
    localStorage.removeItem("user");
    localStorage.removeItem("today");
    history.push('/login');
  }

  return (
    <>
      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>PERINGATAN</CModalHeader>
        <CModalBody>
          Apakah Anda Ingin Keluar ?
        </CModalBody>
        <CModalFooter>
          <CButton 
          onClick={toggleKeluar}
          color="primary">Keluar</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Batal</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
  

}

export default Logout
