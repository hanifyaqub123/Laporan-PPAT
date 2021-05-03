import React,{useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const history = useHistory();
  const[loading,setLoading] = useState(false);
  const [nik,setNik] = useState('');
  const [nama,setNama] = useState('');
  const [alamat,setAlamat] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [imagePP, setImagePP] = useState("");


  const handleNik = e =>{
    setNik(e.target.value)
  }

  const handleNama = e =>{
    setNama(e.target.value)
  }

  const handleAlamat = e =>{
    setAlamat(e.target.value)
  }


  const handleEmail = e =>{
    setEmail(e.target.value)
  }

  const handlePassword = e =>{
    setPassword(e.target.value)
  }
  
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePP(reader.result);
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    console.log(imagePP);
  };

  const handleBuatAkun = e =>{
    if (nik === "") {
      alert("NIK tidak boleh kosong")
    } else if (nama === "") {
      alert("NAMA tidak boleh kosong")
    }else if (alamat === "") {
      alert("ALAMAT tidak boleh kosong")
    }else if (email === "") {
      alert("EMAIL tidak boleh kosong")
    }else if (password === "") {
      alert("PASSWORD tidak boleh kosong")
    }else if (imagePP === "") {
      alert("Image tidak boleh kosong")
    }else{
      setLoading(true)
      const post = {
        nik : nik,
        nama_lengkap : nama,
        alamat : alamat,
        email : email,
        password : password,
        img : imagePP
      }
      axios.post(""+window.server+"rest-api/ppat/login/register.php",post)
        .then((res)=>{
          setLoading(false)
          history.push("/login")
        },(err)=>{
            setLoading(false)
            console.log(err)
        })
    }
  }

  const handleKembali = e =>{
    
    history.push("/login")
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Pendaftaran</h1>
                  <p className="text-muted">Buat akun PPAT</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                    type="number" 
                    placeholder="NIK" 
                    autoComplete="nik"
                    onChange={handleNik} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    autoComplete="nama_lengkap" 
                    onChange={handleNama}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                    type="text" 
                    placeholder="Alamat" 
                    autoComplete="alamat" 
                    onChange={handleAlamat}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                    type="text" 
                    placeholder="Email" 
                    autoComplete="email" 
                    onChange={handleEmail}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                    type="password" 
                    placeholder="Password" 
                    autoComplete="new-password" 
                    onChange={handlePassword}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CLabel style={{ fontWeight: "bold",paddingTop:10 }}>Upload Foto</CLabel>
                    <CInput
                      style={{
                        height: "100%",
                        background: "transparent",
                        border: "none",
                      }}
                      onChange={imageHandler}
                      type="file"
                      id="input"
                      name="image-upload"
                      accept="image/*"
                    />
                  </CInputGroup>
                  <CRow>
                      <CCol xs="6" >
                          <CButton onClick={handleKembali} color="danger" className="px-4">Kembali</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton onClick={handleBuatAkun}  color="success" className="px-4">Buat Akun</CButton>
                      </CCol>
                     
                    </CRow>
                    {
                      loading === true &&
                      <CSpinner style={{marginLeft:'50%'}} color="info" />

                    }
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
     

    </div>
  )
}

export default Register
