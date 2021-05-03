import React,{useEffect, useState} from "react";
import {CButton,CDataTable,CCard,CCol,CRow,CSpinner,CCardBody,CCollapse} from "@coreui/react";
import { useHistory } from 'react-router-dom'
import month from './month'
import axios from 'axios'

const Dashboard = () => {
  const year = (new Date()).getFullYear();
  const years = Array.from(new Array(5),( val, index) => index + year);
  const user = JSON.parse(localStorage.getItem("user"))
  const [data, setData] = useState(""); 
  const [nik,setNIK] = useState("")
  const history = useHistory()
  const [thisMonth,setMonth] = useState("");
  const [thisYears,setYears] = useState("");
  const [loading,setLoading] = useState(false)
  const [details, setDetails] = useState([]);
  const [fields,setFields] = useState()


  // const fields = [
  //   { key: 'nama_ppat'},
  //   'jenis_dan_nomor_hak',
  //   { key: 'bentuk_perbuatan_hukum', _style: { width: '20%'} },
  //   { key: 'letak_tanah_dan_bangunan', _style: { width: '20%'} },
  //   { key: 'nilai_transaksi', _style: { width: '20%'}, },
  //   {
  //     key: "show_details",
  //     label: "",
  //     _style: { width: "1%" },
  //     sorter: false,
  //     filter: false,
  //   },
    
  // ]
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  
  const handleMonth = e =>{
    setMonth(e.target.value)
  }

  const handleYears = e =>{
    setYears(e.target.value)
  }
  useEffect(()=>{

    // mendapatkan tanggal,bulan dan  tahun ini
    // let myCurrentDate = new Date() 

    // let date = myCurrentDate.getDate();
    // let month = myCurrentDate.getMonth() + 1;
    // let year = myCurrentDate.getFullYear();
    if (user === null) {
        history.push("/login")
    } else if (user !== null) {
      setNIK(user[0].nik)
      history.push("/dashboard")
    }
  },[])
  
  const handleCariData = e =>{
    setLoading(true)
    // alert(thisYears+"-"+thisMonth)
    var date = thisYears+"-"+thisMonth
    localStorage.setItem("today",date)
    if (user[0].status === "admin") {
      axios.get(""+window.server+"rest-api/ppat/laporan/readlaporanlengkapadmin.php?bulan_ini="+date+"")
      .then((res)=>{
          if (res.data.message === "No post found") {
            setLoading(false)
            alert("Maaf data tidak tersedia")
            setData([])
          } else {
            setLoading(false)
            setData(res.data)
            setFields( [
              { key: 'nama_ppat', _style: { width: '20%'} },
              { key: 'jumlah_jual_beli', _style: { width: '10%'} },
              { key: 'jumlah_tukar_menukar', _style: { width: '10%'} },
              { key: 'jumlah_hibah', _style: { width: '10%'} },
              { key: 'jumlah_aphb', _style: { width: '10%'}, },
              { key: 'jumlah_apht', _style: { width: '10%'}, },
              { key: 'total_nihil', _style: { width: '10%'}, },
              {
                key: "show_details",
                label: "",
                _style: { width: "1%" },
                sorter: false,
                filter: false,
              },
              
            ])
          }
      },(err)=>{
        setLoading(false)
        console.log(err)
      })    
    } else {
      axios.get(""+window.server+"rest-api/ppat/laporan/filterlaporanuser.php?nik="+nik+"&bulan_ini="+date+"")
      .then((res)=>{
          if (res.data.message === "No post found") {
            setLoading(false)
            alert("Maaf data tidak tersedia")
            setData([])
          } else {
            setLoading(false)
            setData(res.data)
            setFields( [
              { key: 'nama_ppat'},
              'jenis_dan_nomor_hak',
              { key: 'bentuk_perbuatan_hukum', _style: { width: '20%'} },
              { key: 'letak_tanah_dan_bangunan', _style: { width: '20%'} },
              { key: 'nilai_transaksi', _style: { width: '20%'}, },
              {
                key: "show_details",
                label: "",
                _style: { width: "1%" },
                sorter: false,
                filter: false,
              },
              
            ])
          }
      },(err)=>{
        setLoading(false)
        console.log(err)
      })
    }
  
  }

  const handleExport = e =>{
    history.push("/export")
  }

  const handleExportAdmin = e =>{
    history.push("/exportadmin")
  }

  const handleDelete = e =>{
    axios
    .delete("" + window.server + "rest-api/ppat/laporan/deletelaporanbulanan.php", {
      data: { id: e.target.value },
    })
    .then((res) => {
      if (window.confirm('Apakah anda yakin ?')) {
        // alert(JSON.stringify(res.data))
        alert("Data berhasil di delete")
        window.location.reload();
    }
    });

  }
  return (
    <>
    <div style={{paddingBottom:20}}>
    <select
        onChange={handleMonth}
        style={{
          width: "10%",
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
        {month.map((res, index) => {
          return (
            <option key={index} value={res.nilai}>
              {res.bulan}
            </option>
          );
        })}
      </select>
      
      <select
        onChange={handleYears}
        style={{
          width: "10%",
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
      </select>
      <CButton onClick={handleCariData} color="info">Cari Data</CButton>
      {
        loading === true &&
        <CSpinner style={{marginLeft:20}} color="info" />
      }

    </div>
    <CCard style={{ padding: "5%" }}>
    <CDataTable
      items={data}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        show_details: (item, index) => {
          return (
            <div>
            
                <div>
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      {details.includes(index) ? "Hide" : "Show"}
                    </CButton>
                  </td>
                </div>
              
            </div>
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <h4>{item.bentuk_perbuatan_hukum}</h4>
                <p className="text-muted">
                  Jenis dan Nomor Hak: {item.jenis_dan_nomor_hak}
                </p>
                <CButton
                  value={item.id}
                  onClick={handleDelete}
                  size="sm"
                  color="danger"
                  className="ml-1"
                >
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
     </CCard>
     <CRow style={{marginTop:'2%',marginBottom:'2%'}}>
     <CCol className="text-right" xs="6">
            <label>Nb: Pilih Bulan dan Tahun Terlebih dahulu sebelum Export Data</label>          </CCol>
                      { user[0].status === "admin" ?
                        <CCol className="text-right" xs="6">
                        <CButton onClick={handleExportAdmin} color="primary" className="px-4">Export Data All</CButton>
                      </CCol>
                      :
                      <CCol className="text-right" xs="6">
                      <CButton onClick={handleExport} color="primary" className="px-4">Export Data</CButton>
                    </CCol>
                    }
        </CRow>
    </>
  );
};

export default Dashboard;
