import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const Login = () => {
  const[loading,setLoading] = useState(false);
  const history = useHistory()
  const [nik,setNik] = useState('');
  const [password,setPassword] = useState('');

  // useEffect(()=>{

  //   // mendapatkan tanggal,bulan dan  tahun ini
  //   // let myCurrentDate = new Date() 

  //   // let date = myCurrentDate.getDate();
  //   // let month = myCurrentDate.getMonth() + 1;
  //   // let year = myCurrentDate.getFullYear();

  //   const user = JSON.parse(localStorage.getItem("user"))
  //   if (user === null) {
  //       history.push("/login")
  //   } else if (user !== null) {
  //     history.push("/dashboard")
  //   }
  // },[history])

  const handleNik = e =>{
    setNik(e.target.value)
  }

  const handlePassword = e =>{
    setPassword(e.target.value)
  }
  const handleLogin = e =>{
    if (nik === "") {
      alert("NIK tidak boleh kosong")
    } else  if (password === "") {
      alert("Password tidak boleh kosong")
    } else{
      setLoading(true)
      axios.get(""+window.server+"rest-api/ppat/login/login.php?nik="+nik+"&password="+password+"")
      .then((res)=>{
        if (res.data.message === "No post found") {
          setLoading(false)
          alert("NIK atau Passsword Salah")
        } else {

          localStorage.setItem("user",JSON.stringify(res.data))
          setLoading(false)
          history.push("/dashboard")
        }

      },(err)=>{
          setLoading(false)
          console.log(err)
      })

    }
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1> PPAT</h1>
                    <p className="text-muted">Login dengan nik yang sudah terdaftar</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                      value={nik}
                      type="number" 
                      placeholder="NIK" 
                      autoComplete="nik" 
                      name="nik"
                      onChange={handleNik}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput 
                      value={password}
                      type="password" 
                      placeholder="Password" 
                      autoComplete="current-password"
                      name="password"
                      onChange={handlePassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleLogin} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      {
                      loading === true &&
                      <CSpinner style={{marginLeft:'50%'}} color="info" />

          }
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Daftar</h2>
                    <p>Bagi PPAT yang belum mempunyai akun, silahkan mendaftar terlebih dahulu sesuai dengan KTP.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Daftar Sekarang!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
          
            </CCardGroup>
          </CCol>
        </CRow>
     
      </CContainer>
    </div>
  )
}

export default Login
