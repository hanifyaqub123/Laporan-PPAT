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
import month1 from '../dashboard/month'

const LaporanNihil = () => {
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
  const [jenisPelayanan] = useState("Nihil");
  const [namaPengalihan, setNamaPengalihan] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");
  const [jenisNoHak, setJenisNoHak] = useState("");
  const [letakTanahBangunan, setLetakTanahBangunan] = useState("");
  const [luasTanah, setLuasTanah] = useState("0");
  const [luasBangunan, setLuasBangunan] = useState("0");
  const [nilaiTransaksi, setNilaiTransaksi] = useState("0");
  const [nopTahun, setNopTahun] = useState("");
  const [njop, setNjop] = useState("0");
  const [sspTgl, setSspTgl] = useState("");
  const [sspRp, setSspRp] = useState("0");
  const [ssbTgl, setSsbTgl] = useState("");
  const [ssbRp, setSsbRp] = useState("0");
  const [ket, setKet] = useState("-");
  const [bulanIni] = useState(today);
  const [namaPPAT] = useState(user[0].nama_lengkap)
 
  
  // const handleMonth = e =>{
  //   setMonth(e.target.value)
  // }

  // const handleYears = e =>{
  //   setYears(e.target.value)
  // }
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

  const handleLetakTanah = (e) => {
    setLetakTanahBangunan(e.target.value);
  };

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
    const post = {
      // nik sementara
      nik : nik,
      akta_nomor : aktaNomor,
      akta_tanggal: aktaTanggal,
      bentuk_perbuatan_hukum : jenisPelayanan,
      nama_pengalihan : namaPengalihan,
      nama_penerima : namaPenerima,
      jenis_dan_nomor_hak: jenisNoHak,
      letak_tanah_dan_bangunan: letakTanahBangunan,
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

    if (aktaTanggal === "") {
        alert("Akta Tanggal tidak boleh kosong")
    } else {
        axios.post(""+window.server+"rest-api/ppat/laporan/laporanbulanan.php",post)
        .then((res)=>{
          alert(JSON.stringify(res.data))
          window.location.reload();
        },(err)=>{
          console.log(err)
        })
    }

  
  };

  return (
    <>
      <CContainer fluid>
        <CRow>
          <CCol sm="6">
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel>Nomor Akta</CLabel>
                <CInput
                  disabled="disabled"
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
                    disabled="disabled"
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
                disabled="disabled"
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
                <CInput
                disabled="disabled"
                  defaultValue={jenisNoHak}
                  type="text"
                  id="jenis-nomor-hak"
                  name="jenis-nomor-hak"
                  placeholder="HGB,HM,HP,HGU - 000"
                  onChange={handleJenisdanNomorHak}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Letak Tanah dan Bangunan</CLabel>
                <CInput
                disabled="disabled"
                  defaultValue={letakTanahBangunan}
                  type="text"
                  id="letak-tanah-dan-bangunan"
                  name="letak-tanah-dan-bangunan"
                  placeholder="Desa"
                  onChange={handleLetakTanah}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Luas Tanah</CLabel>
                <CInput
                disabled="disabled"
                  defaultValue={luasTanah}
                  type="text"
                  id="luas-tanah"
                  name="luas-tanah"
                  placeholder="00"
                  onChange={handleLuasTanah}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Luas Bangunan</CLabel>
                <CInput
                disabled="disabled"
                  defaultValue={luasBangunan}
                  type="text"
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
                disabled="disabled"
                  defaultValue={nilaiTransaksi}
                  type="text"
                  id="nilai-transaksi"
                  name="nilai-transaksi"
                  placeholder="000.000.000"
                  onChange={handleNilaiTransaksi}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>NOP / Tahun</CLabel>
                <CInput
                disabled="disabled"
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
                disabled="disabled"
                  defaultValue={njop}
                  type="text"
                  id="njop"
                  name="njop"
                  placeholder="00.0000.000"
                  onChange={handleNJOP}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>SSP Tanggal</CLabel>
                <CInput
                disabled="disabled"
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
                disabled="disabled"
                  defaultValue={sspRp}
                  type="text"
                  id="ssp-rp"
                  name="ssp-rp"
                  placeholder="00.0000.000"
                  onChange={handleSSPRp}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>SSB Tanggal</CLabel>
                <CInput
                disabled="disabled"
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
                disabled="disabled"
                  defaultValue={ssbRp}
                  type="text"
                  id="ssb-rp"
                  name="ssb-rp"
                  placeholder="00.0000.000"
                  onChange={handleSSBRp}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel>Keterangan</CLabel>
                <CInput
                disabled="disabled"
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

export default LaporanNihil;
