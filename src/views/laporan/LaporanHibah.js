import React, { useState } from "react";
import {
  CTextarea,
  CContainer,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
} from "@coreui/react";
import axios from 'axios'
import kecamatan from '../laporan/DataKecamatan'
import jenisHak from '../laporan/jenisHak'

const LaporanHibah = () => {
  const year1 = (new Date()).getFullYear();
  const years = Array.from(new Array(5),( val, index) => index + year1);
  let myCurrentDate = new Date() 
  let month = ( '0' + (myCurrentDate.getMonth()+1) ).slice( -2 );
  let year = myCurrentDate.getFullYear();
  const today = year+"-"+month
  const regex = /[.,\s]/g;
  const user = JSON.parse(localStorage.getItem("user"))
  const [nik] = useState(user[0].nik);
  const [aktaNomor, setAktaNomor] = useState("");
  const [aktaTanggal, setAktaTanggal] = useState("");
  const [jenisPelayanan] = useState("Hibah");
  const [namaPengalihan, setNamaPengalihan] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");
  const [jenisNoHak, setJenisNoHak] = useState("");
  // const [letakTanahBangunan, setLetakTanahBangunan] = useState("");
  const [luasTanah, setLuasTanah] = useState("");
  const [luasBangunan, setLuasBangunan] = useState("");
  const [nilaiTransaksi, setNilaiTransaksi] = useState("");
  const [nopTahun, setNopTahun] = useState("");
  const [njop, setNjop] = useState("");
  const [sspTgl, setSspTgl] = useState("");
  const [sspRp, setSspRp] = useState("");
  const [ssbTgl, setSsbTgl] = useState("");
  const [ssbRp, setSsbRp] = useState("");
  const [ket, setKet] = useState("");
  const [bulanIni] = useState(today);
  const [namaPPAT] = useState(user[0].nama_lengkap)
  const [Valuekota, setValuekota] = useState("");
  const [Valuekecamatan, setValueKecamatan] = useState("");
  const [Valuedesa,setValueDesa] = useState("");
  const [Valuejenishak,setValueJenisHak] = useState("");


  const dataArgomulyo = [
    {
      desa : "Cebongan"
    },
    {
      desa : "Kumpulrejo"
    },
    {
      desa : "Ledok"
    },
    {
      desa : "Noborejo"
    },
    {
      desa : "Randuacir"
    },
    {
      desa : "Tegalrejo"
    }
  ]
 
  const dataSidoMukti = [
    {
      desa : "Dukuh"
    },
    {
      desa : "Kalicacing"
    },
    {
      desa : "Kecandran"
    },
    {
      desa : "Mangunsari"
    }
  ]

  const dataSidorejo = [
    {
      desa : "Blotongan"
    },
    {
      desa : "Bugel"
    },
    {
      desa : "Kauman Kidul"
    },
    {
      desa : "Pulutan"
    },
    {
      desa : "Salatiga"
    },
    {
      desa : "Sidorejo Lor"
    }
  ]
  const dataTingkir = [
    {
      desa : "Gendongan"
    },
    {
      desa : "Kalibening"
    },
    {
      desa : "Kutowinangun"
    },
    {
      desa : "Kutowinangun Kidul"
    },
    {
      desa : "Kutowinangun Lor"
    },
    {
      desa : "Sidorejo Kidul"
    },
    {
      desa : "Tingkir Lor"
    },
    {
      desa : "Tingkir Tengah"
    }
  ]
  
  const handleNomorAkta = (e) => {
    setAktaNomor(e.target.value);
  };

  const handleTanggalAkta = (e) => {
    setAktaTanggal(e.target.value);
  };

  const handleNamaPengalih = (e) => {
    setNamaPengalihan(e.target.value);
  };

  const handleNamaPenerima = (e) => {
    setNamaPenerima(e.target.value);
  };

  const handleJenisdanNomorHak = (e) => {
    setJenisNoHak(e.target.value);
  };

  // const handleLetakTanah = (e) => {
  //   setLetakTanahBangunan(e.target.value);
  // };

  const handleLuasTanah = (e) => {
    setLuasTanah(e.target.value);
  };

  const handleLuasBangunan = (e) => {
    setLuasBangunan(e.target.value);
  };

  const handleNilaiTransaksi = (e) => {
    setNilaiTransaksi(e.target.value);
  };

  const handleNOPTahun = (e) => {
    setNopTahun(e.target.value);
  };

  const handleNJOP = (e) => {
    setNjop(e.target.value);
  };

  const handleSSPTanggal = (e) => {
    setSspTgl(e.target.value);
  };

  const handleSSPRp = (e) => {
    setSspRp(e.target.value);
  };

  const handleSSBTanggal = (e) => {
    setSsbTgl(e.target.value);
  };

  const handleSSBRp = (e) => {
    setSsbRp(e.target.value);
  };

  const handleKeterangan = (e) => {
    setKet(e.target.value);
  };

 

  const handleSimpan = (e) => {
    // alert(Valuejenishak+"-"+jenisNoHak)
    // alert(Valuekota+","+Valuekecamatan+","+Valuedesa)

    const post = {
      // nik sementara
      nik : nik,
      akta_nomor : aktaNomor,
      akta_tanggal: aktaTanggal,
      bentuk_perbuatan_hukum : jenisPelayanan,
      nama_pengalihan : namaPengalihan,
      nama_penerima : namaPenerima,
      jenis_dan_nomor_hak: Valuejenishak+"-"+jenisNoHak,
      letak_tanah_dan_bangunan: Valuekota+","+Valuekecamatan+","+Valuedesa,
      luas_tanah : luasTanah.replace(regex,''),
      luas_bangunan: luasBangunan.replace(regex,''),
      nilai_transaksi : nilaiTransaksi.replace(regex,''),
      nop_tahun : nopTahun,
      njop_rp : njop.replace(regex,''),
      ssp_tanggal : sspTgl,
      ssp_rp : sspRp.replace(regex,''),
      ssb_tanggal : ssbTgl,
      ssb_rp : ssbRp.replace(regex,''),
      ket:ket,
      bulan_ini:bulanIni,
      nama_ppat:namaPPAT
    }

  if (aktaNomor === "") {
      alert("Akta Nomor Tidak boleh kosong beri tanda - jika kosong")
  } else if (aktaTanggal === "") {
    alert("Akta Tanggal Tidak boleh kosong beri tanda - jika kosong")
  }else if (jenisPelayanan === "") {
    alert("Tidak boleh kosong beri tanda - jika kosong")
  }else if (namaPengalihan === "") {
    alert("Pihak Pengalihkan Tidak boleh kosong beri tanda - jika kosong")
  }else if (namaPenerima === "") {
    alert("Pihak Penerima Tidak boleh kosong beri tanda - jika kosong")
  }else if (Valuejenishak === "") {
    alert("Jenis  Hak Tidak boleh kosong")
  }else if (jenisNoHak === "") {
    alert("No Hak Tidak boleh kosong")
  }else if (Valuekota === "") {
    alert("Kota Tidak boleh kosong")
  }else if (Valuekecamatan === "") {
    alert("Kecamatan Tidak boleh kosong")
  }else if (Valuedesa === "") {
    alert("Desa Tidak boleh kosong")
  }else if (luasTanah === "") {
    alert("Luas Tanah Tidak boleh kosong beri tanda 0 jika kosong")
  }else if (luasTanah === "-") {
    alert("Luas Tanah Tidak boleh menggunakan - , gunakan 0 jika kosong")
  }else if (luasBangunan === "") {
    alert("Luas Bangunan Tidak boleh kosong beri 0 jika kosong")
  }else if (luasBangunan === "-") {
    alert("Luas Bangunan Tidak boleh menggunakan - , gunakan 0 jika kosong")
  }else if (nilaiTransaksi === "") {
    alert("Nilai Transaksi Tidak boleh kosong beri 0 jika kosong")
  }else if (nilaiTransaksi === "-") {
    alert("Nilai Transaksi Tidak boleh menggunakan - , gunakan 0 jika kosong")
  }else if (nopTahun === "") {
    alert("Nop Tahun Tidak boleh kosong beri tanda - jika kosong")
  }else if (njop === "") {
    alert("NJOP Tidak boleh kosong beri 0 jika kosong")
  }else if (njop === "-") {
    alert("NJOP Tidak boleh  menggunakan - , gunakan 0 jika kosong")
  }else if (sspTgl === "") {
    alert("SSP Tanggal Tidak boleh kosong beri tanda - jika kosong")
  }else if (sspRp === "") {
    alert("SSP Rp Tidak boleh kosong beri 0 jika kosong")
  }else if (sspRp === "-") {
    alert("SSP Rp Tidak boleh menggunakan - , gunakan 0 jika kosong")
  }else if (ssbTgl === "") {
    alert("SSB Tanggal Tidak boleh kosong beri tanda - jika kosong")
  }else if (ssbRp === "") {
    alert("SSB Rp Tidak boleh kosong beri 0 jika kosong")
  }else if (ssbRp === "-") {
    alert("SSB Rp Tidak boleh menggunakan - , gunakan 0 jika kosong")
  }else if (ket === "") {
    alert("Keterangan Tidak boleh kosong beri tanda - jika kosong")
  }else{
    // alert(JSON.stringify(post))
    axios.post(""+window.server+"rest-api/ppat/laporan/laporanbulanan.php",post)
    .then((res)=>{
      alert(JSON.stringify(res.data))
      window.location.reload();
    },(err)=>{
      console.log(err)
    })
   
  }
  
  };
  
  const handleKota = e =>{
    setValuekota(e.target.value)
  }

  const handleKecamatan = e =>{
    setValueKecamatan(e.target.value)
  }

  const handleDesa = e =>{
    setValueDesa(e.target.value)
  }

  const handleJenisHak = e =>{
    setValueJenisHak(e.target.value)
  }


  return (
    <>
      <CContainer fluid>
        <CRow>
          <CCol sm="6">
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel>Nomor Akta</CLabel>
                <CInput
                  defaultValue={aktaNomor}
                  type="text"
                  id="no-akta"
                  name="no-akta"
                  placeholder="Nomor Akta / Tahun"
                  onChange={handleNomorAkta}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Tanggal Akta</CLabel>
                <CInput
                  defaultValue={aktaTanggal}
                  type="date"
                  id="tanggal-akta"
                  name="tanggal-akta"
                  placeholder="Tanggal Akta . . ."
                  onChange={handleTanggalAkta}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Bentuk Perbuatan Hukum</CLabel>
                <CInput
                  disabled="disabled"
                  defaultValue={jenisPelayanan}
                  type="text"
                  id="jual-beli"
                  name="jual-beli"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Pihak Yang Mengalihkan</CLabel>
                <CTextarea
                  defaultValue={namaPengalihan}
                  rows="5"
                  id="nama-pengalih"
                  name="nama-pengalih"
                  placeholder="1. .... , 2. ..... atau ..... , ...."
                  onChange={handleNamaPengalih}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Pihak Yang Menerima</CLabel>
                <CTextarea
                  defaultValue={namaPenerima}
                  rows="5"
                  id="nama-penerima"
                  name="nama-penerima"
                  placeholder="1. .... , 2. ..... atau ..... , ...."
                  onChange={handleNamaPenerima}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Jenis dan Nomor Hak</CLabel>
                <div style={{display:'flex', flexDirection:'row'}}>
                <select onChange={handleJenisHak} style={{paddingTop:5,paddingBottom:5,paddingLeft:5,borderWidth:0,borderRadius:'10%'}}>
                      <option value="" selected="selected" >--- Jenis Hak ---</option>
                      {
                        jenisHak.map((res,index)=>{
                          return(
                            <option key={index} value={res.jenis}>{res.jenis}</option>
                          )
                        })
                      }
                </select>
                    
                <CInput
                  style={{marginLeft:10}}
                  defaultValue={jenisNoHak}
                  type="number"
                  id="jenis-nomor-hak"
                  name="jenis-nomor-hak"
                  placeholder="000"
                  onChange={handleJenisdanNomorHak}
                />
                </div>
              </CFormGroup>
              <CFormGroup>
                <CLabel>Letak Tanah dan Bangunan</CLabel>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <select onChange={handleKota} style={{paddingTop:10,paddingBottom:10,paddingLeft:5,borderWidth:0,borderRadius:'5%'}}>
                      <option value="" selected="selected" >---Kabupaten/Kota---</option>
                      <option value="Salatiga">Salatiga</option>
                    </select>
                    
                    <select onChange={handleKecamatan} style={{marginLeft:"2%",borderWidth:0,borderRadius:'5%'}}>
                      <option value="" selected="selected" >---Kecamatan---</option>
                      {
                        kecamatan.map((res,index)=>{
                          return(
                            <option key={index} value={res.kecamatan}>{res.kecamatan}</option>
                          )
                        })
                      }
                    </select>
                    <select onChange={handleDesa} style={{marginLeft:"1%",borderWidth:0,borderRadius:'5%'}}>
                      <option value="" selected="selected" >---Desa/kelurahan---</option>
                      {
                        Valuekecamatan === "Argomulyo" &&
                        dataArgomulyo.map((res,index)=>{
                          return(
                            <option key={index} value={res.desa} >{res.desa}</option>
                          )
                        })
                      }
                       {
                        Valuekecamatan === "Sidomukti" &&
                        dataSidoMukti.map((res,index)=>{
                          return(
                            <option key={index} value={res.desa} >{res.desa}</option>
                          )
                        })
                      } 
                      {
                        Valuekecamatan === "Sidorejo" &&
                        dataSidorejo.map((res,index)=>{
                          return(
                            <option key={index} value={res.desa} >{res.desa}</option>
                          )
                        })
                      } 
                      {
                        Valuekecamatan === "Tingkir" &&
                        dataTingkir.map((res,index)=>{
                          return(
                            <option key={index} value={res.desa} >{res.desa}</option>
                          )
                        })
                      } 
                    </select>
                </div>
              </CFormGroup>
              <CFormGroup>
                <CLabel>Luas Tanah</CLabel>
                <CInput
                  defaultValue={luasTanah}
                  type="number"
                  id="luas-tanah"
                  name="luas-tanah"
                  placeholder="00"
                  onChange={handleLuasTanah}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Luas Bangunan</CLabel>
                <CInput
                  defaultValue={luasBangunan}
                  type="number"
                  id="luas-bangunan"
                  name="luas-bangunan"
                  placeholder="00"
                  onChange={handleLuasBangunan}
                />
              </CFormGroup>
            </CForm>
          </CCol>
          <CCol sm="6">
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel>Nilai Transaksi</CLabel>
                <CInput
                  defaultValue={nilaiTransaksi}
                  type="number"
                  id="nilai-transaksi"
                  name="nilai-transaksi"
                  placeholder="000.000.000"
                  onChange={handleNilaiTransaksi}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>NOP / Tahun</CLabel>
                <CInput
                  defaultValue={nopTahun}
                  type="text"
                  id="nop-tahun"
                  name="nop-tahun"
                  placeholder="xx.xx.xxx.xxx-xxxx.0/2021"
                  onChange={handleNOPTahun}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>NJOP</CLabel>
                <CInput
                  defaultValue={njop}
                  type="number"
                  id="njop"
                  name="njop"
                  placeholder="00.0000.000"
                  onChange={handleNJOP}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>SSP Tanggal</CLabel>
                <CInput
                  defaultValue={sspTgl}
                  type="date"
                  id="ssp-tanggal"
                  name="ssp-tanggal"
                  onChange={handleSSPTanggal}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>SSP Rp</CLabel>
                <CInput
                  defaultValue={sspRp}
                  type="number"
                  id="ssp-rp"
                  name="ssp-rp"
                  placeholder="00.0000.000"
                  onChange={handleSSPRp}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>SSB Tanggal</CLabel>
                <CInput
                  defaultValue={ssbTgl}
                  type="date"
                  id="ssb-tanggal"
                  name="ssb-tanggal"
                  onChange={handleSSBTanggal}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>SSB Rp</CLabel>
                <CInput
                  defaultValue={ssbRp}
                  type="number"
                  id="ssb-rp"
                  name="ssb-rp"
                  placeholder="00.0000.000"
                  onChange={handleSSBRp}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Keterangan</CLabel>
                <CInput
                  defaultValue={ket}
                  type="text"
                  id="keterangan"
                  name="keterangan"
                  placeholder="-"
                  onChange={handleKeterangan}
                />
              </CFormGroup>
              {/* <select
        onChange={handleMonth}
        style={{
          width: "40%",
          height: 40,
          paddingLeft: 5,
          marginRight: "2%",
          border: "none",
          borderRadius: 5,
          marginBottom: 10,
        }}
        id="month"
        name="month"
      >
        <option selected="selected">Pilih Bulan</option>
        {month1.map((res, index) => {
          return (
            <option key={index} value={res.nilai}>
              {res.bulan}
            </option>
          );
        })}
      </select>
       */}
      {/* <select
        onChange={handleYears}
        style={{
          width: "40%",
          height: 40,
          paddingLeft: 5,
          marginRight: "3%",
          border: "none",
          borderRadius: 5,
          marginBottom: 10,
        }}
        id="month"
        name="month"
      >
        <option selected="selected">Pilih Tahun</option>
        {years.map((res, index) => {
          return (
            <option key={index} value={res}>
              {res}
            </option>
          );
        })}
      </select> */}

              <CCol xs="13" className="text-right">
                <CButton onClick={handleSimpan} color="success">
                  Simpan
                </CButton>
              </CCol>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default LaporanHibah;
