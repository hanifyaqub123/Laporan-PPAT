import React,{useEffect, useState} from "react";
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



const ExportLaporan = () =>{
    let newDate = new Date()
    let date1 = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const user = JSON.parse(localStorage.getItem("user"))
    const date = localStorage.getItem("today")
    const [data,setData] = useState("");
    const [id,setID] = useState();

    // alert(JSON.stringify(user[0].nama_lengkap))

    const [buttonUpload,setButtonUpload] = useState();

    // Total Jumlah Rp
    const [jualBeli,setJualBeli] = useState();
    const [hibah,setHibah] = useState();
    const [TukarMenukar,setTukarMenukar] = useState();
    const [APHB,setAPHB] = useState();
    const [APHT,setAPHT] = useState();


    // Jual Beli
    const [jualBeliJenis,setJualBeliJenis] = useState("0");
    const [luasTanahJB,setluasTanahJB] = useState("0");
    const [nilaiTransaksiJB,setnilaiTransaksiJB] = useState("0");
    const [nilaiTransaksiJBSSP,setnilaiTransaksiJBSSP] = useState()
    const [nilaiTransaksiJBSSB,setnilaiTransaksiJBSSB] = useState()


    // Tukar Menukar
    const [TukarMenukarJenis,setTukarMenukarJenis] = useState("0");
    const [luasTanahTukarMenukar,setluasTanahTukarMenukar] = useState("0");
    const [nilaiTransaksiTukarMenukar,setnilaiTransaksiTukarMenukar] = useState("0");
    const [nilaiTransaksiTukarMenukarSSP,setnilaiTransaksiTukarMenukarSSP] = useState()
    const [nilaiTransaksiTukarMenukarSSB,setnilaiTransaksiTukarMenukarSSB] = useState()

    // Hibah 
    const [hibahJenis,setHibahJenis] = useState("0");
    const [luasTanahHibah,setluasTanahHibah] = useState("0");
    const [nilaiTransaksiHibah,setnilaiTransaksiHibah] = useState("0");
    const [nilaiTransaksiHibahSSP,setnilaiTransaksiHibahSSP] = useState()
    const [nilaiTransaksiHibahSSB,setnilaiTransaksihibahSSB] = useState()

    // APHB
    const [APHBJenis,setAPHBJenis] = useState("0");
    const [luasTanahAphb,setluasTanahAphb] = useState("0");
    const [nilaiTransaksiAphb,setnilaiTransaksiAphb] = useState("0");
    const [nilaiTransaksiAphbSSP,setnilaiTransaksiAphbSSP] = useState()
    const [nilaiTransaksiAphbSSB,setnilaiTransaksiAphbSSB] = useState()

    // APHT
    const [APHTJenis,setAPHTJenis] = useState("0");
    const [luasTanahApht,setluasTanahApht] = useState("0");
    const [nilaiTransaksiApht,setnilaiTransaksiApht] = useState("0");
    const [nilaiTransaksiAphtSSP,setnilaiTransaksiAphtSSP] = useState()
    const [nilaiTransaksiAphtSSB,setnilaiTransaksiAphtSSB] = useState()

     // Nihil
     const [NihilJenis,setNihilJenis] = useState("0");
     const [luasTanahNihil] = useState("0");
     const [nilaiTransaksinihil] = useState("0");
     const [nilaiTransaksiNihilSSP] = useState("0")
     const [nilaiTransaksiNihilSSB] = useState("0")

    // SSP dan SSB Total
    const [totalTransasksi,setTotalTransaksi] = useState("0"); 
    const [totalSSP,setTotalSSP] = useState("0"); 
    const [totalSSB,setTotalSSB] = useState("0"); 

    

    useEffect(()=>{
      handleFilterButton();
      handleTableValue();
    },[])

   function handleTableValue(){
       // Get ada Table
       axios.get(""+window.server+"rest-api/ppat/laporan/filterlaporanuser.php?nik="+user[0].nik+"&bulan_ini="+date+"")
       .then((res)=>{
           if (res.data.message === "No post found") {
           //   setLoading(false)
             alert("Maaf data tidak tersedia")
           } else {
            var sumNilaiTransaksi = 0;
            for (let i = 0; i< res.data.length; i++) {
                const element = res.data[i].nilai_transaksi;
                const JualBeliTotal = Number(element)
                sumNilaiTransaksi = sumNilaiTransaksi + JualBeliTotal;
 
            }
            setTotalTransaksi(sumNilaiTransaksi)

            var sumSSP = 0;
            for (let i = 0; i< res.data.length; i++) {
                const element = res.data[i].ssp_rp;
                const JualBeliTotal = Number(element)
                sumSSP = sumSSP + JualBeliTotal;
 
            }
            setTotalSSP(sumSSP)

            var sumSSB = 0;
            for (let i = 0; i< res.data.length; i++) {
                const element = res.data[i].ssb_rp;
                const JualBeliTotal = Number(element)
                sumSSB = sumSSB + JualBeliTotal;
 
            }
            setTotalSSB(sumSSB)

           //   setLoading(false)
           const JualBeli = res.data.filter((e)=> e.bentuk_perbuatan_hukum.includes("Jual Beli"))
           const Hibah = res.data.filter((e)=> e.bentuk_perbuatan_hukum.includes("Hibah"))
           const TukarMenukar = res.data.filter((e)=> e.bentuk_perbuatan_hukum.includes("Tukar Menukar"))
           const aphb = res.data.filter((e)=> e.bentuk_perbuatan_hukum.includes("APHB"))
           const apht = res.data.filter((e)=> e.bentuk_perbuatan_hukum.includes("APHT"))
           const nihil = res.data.filter((e)=> e.bentuk_perbuatan_hukum.includes("Nihil"))

           setJualBeliJenis(JualBeli.length)
           setHibahJenis(Hibah.length)
           setTukarMenukarJenis(TukarMenukar.length)
           setAPHBJenis(aphb.length)
           setAPHTJenis(apht.length)
           setNihilJenis(nihil.length)
           
             // Jumlah Nilai Transaksi
           var sumJual = 0;
           for (let i = 0; i< JualBeli.length; i++) {
               const element = JualBeli[i].nilai_transaksi;
               const JualBeliTotal = Number(element)
               sumJual = sumJual + JualBeliTotal;

           }
           setJualBeli(sumJual)
              // Jumlah Nilai Transaksi

              // Jumlah Nilai Hibah
           var sumHibah = 0;
           for (let i = 0; i< Hibah.length; i++) {
               const element = Hibah[i].nilai_transaksi;
               const JualBeliTotal = Number(element)
               sumHibah = sumHibah + JualBeliTotal;

           }
           setHibah(sumHibah)

              // Jumlah Nilai Hibah

                // Jumlah Nilai Tukar Menukar
           var sumTukarMenukar = 0;
           for (let i = 0; i< TukarMenukar.length; i++) {
               const element = TukarMenukar[i].nilai_transaksi;
               const JualBeliTotal = Number(element)
               sumTukarMenukar = sumTukarMenukar + JualBeliTotal;

           }
           setTukarMenukar(sumTukarMenukar)

              // Jumlah Nilai Tukar Menukar

               // Jumlah Nilai aphb
           var sumaphb = 0;
           for (let i = 0; i< aphb.length; i++) {
               const element = aphb[i].nilai_transaksi;
               const JualBeliTotal = Number(element)
               sumaphb = sumaphb + JualBeliTotal;

           }
           setAPHB(sumaphb)

              // Jumlah Nilai aphb


                // Jumlah Nilai apht
           var sumapht = 0;
           for (let i = 0; i< apht.length; i++) {
               const element = apht[i].nilai_transaksi;
               const JualBeliTotal = Number(element)
               sumapht = sumapht + JualBeliTotal;

           }
           setAPHT(sumapht)

              // Jumlah Nilai apht
              
// JUAL BELI

           // Jumlah Luas Tanah JB
           var sumLuasTanahJB = 0;
           for (let i = 0; i< JualBeli.length; i++) {
               const element = JualBeli[i].luas_tanah;
               const JualBeliTotal = Number(element)
               sumLuasTanahJB = sumLuasTanahJB + JualBeliTotal;

           }
           setluasTanahJB(sumLuasTanahJB)
           // Jumlah Luas Tanah JB

            // Jumlah Nilai total JB
            var sumNilaiTransaksiJB = 0;
            for (let i = 0; i< JualBeli.length; i++) {
                const element = JualBeli[i].nilai_transaksi	;
                const JualBeliTotal = Number(element)
                sumNilaiTransaksiJB = sumNilaiTransaksiJB + JualBeliTotal;

            }
            setnilaiTransaksiJB(sumNilaiTransaksiJB)
            // Jumlah Nilai total JB

             // Jumlah Nilai total JB SSP
             var sumNilaiTransaksiJBSSP = 0;
             for (let i = 0; i< JualBeli.length; i++) {
                 const element = JualBeli[i].ssp_rp;
                 const JualBeliTotal = Number(element)
                 sumNilaiTransaksiJBSSP = sumNilaiTransaksiJBSSP + JualBeliTotal;
 
             }
             setnilaiTransaksiJBSSP(sumNilaiTransaksiJBSSP)
             // Jumlah Nilai total JB SSP

              // Jumlah Nilai total JB SSB
              var sumNilaiTransaksiJBSSB = 0;
              for (let i = 0; i< JualBeli.length; i++) {
                  const element = JualBeli[i].ssb_rp;
                  const JualBeliTotal = Number(element)
                  sumNilaiTransaksiJBSSB = sumNilaiTransaksiJBSSB + JualBeliTotal;
  
              }
              setnilaiTransaksiJBSSB(sumNilaiTransaksiJBSSB)
              // Jumlah Nilai total JB SSB
            

  // JUAL BELI END

  // Tukar Menukar

           // Jumlah Luas Tanah Tukar Menukar
           var sumLuasTanahTukarmenukar = 0;
           for (let i = 0; i< TukarMenukar.length; i++) {
               const element = TukarMenukar[i].luas_tanah;
               const JualBeliTotal = Number(element)
               sumLuasTanahTukarmenukar = sumLuasTanahTukarmenukar + JualBeliTotal;

           }
           setluasTanahTukarMenukar(sumLuasTanahTukarmenukar)
           // Jumlah Luas Tanah Tukar Menukar

            // Jumlah Nilai total Tukar Menukar
            var sumNilaiTransaksiTukarMenukar = 0;
            for (let i = 0; i< TukarMenukar.length; i++) {
                const element = TukarMenukar[i].nilai_transaksi	;
                const JualBeliTotal = Number(element)
                sumNilaiTransaksiTukarMenukar = sumNilaiTransaksiTukarMenukar + JualBeliTotal;

            }
            setnilaiTransaksiTukarMenukar(sumNilaiTransaksiTukarMenukar)
            // Jumlah Nilai total Tukar Menukar

                 // Jumlah Nilai total Tukar Menukar SSP
                 var sumNilaiTransaksiTukarMenukarSSP = 0;
                 for (let i = 0; i< TukarMenukar.length; i++) {
                     const element = TukarMenukar[i].ssp_rp;
                     const JualBeliTotal = Number(element)
                     sumNilaiTransaksiTukarMenukarSSP = sumNilaiTransaksiTukarMenukarSSP + JualBeliTotal;
     
                 }
                 setnilaiTransaksiTukarMenukarSSP(sumNilaiTransaksiTukarMenukarSSP)
                 // Jumlah Nilai total Tukar Menukar SSP
    
                  // Jumlah Nilai total Tukar Menukar SSB
                  var sumNilaiTransaksiTukarMenukarSSB = 0;
                  for (let i = 0; i< TukarMenukar.length; i++) {
                      const element = TukarMenukar[i].ssb_rp;
                      const JualBeliTotal = Number(element)
                      sumNilaiTransaksiTukarMenukarSSB = sumNilaiTransaksiTukarMenukarSSB + JualBeliTotal;
      
                  }
                  setnilaiTransaksiTukarMenukarSSB(sumNilaiTransaksiTukarMenukarSSB)
                  // Jumlah Nilai total Tukar Menukar SSB

  // Tukar Menukar END

   // HIBAH

           // Jumlah Luas Tanah HIBAH
           var sumLuasTanahHibah = 0;
           for (let i = 0; i< Hibah.length; i++) {
               const element = Hibah[i].luas_tanah;
               const JualBeliTotal = Number(element)
               sumLuasTanahHibah = sumLuasTanahHibah + JualBeliTotal;

           }
           setluasTanahHibah(sumLuasTanahHibah)
           // Jumlah Luas Tanah HIBAH

            // Jumlah Nilai total HIBAH
            var sumNilaiTransaksiHibah = 0;
            for (let i = 0; i< Hibah.length; i++) {
                const element = Hibah[i].nilai_transaksi	;
                const JualBeliTotal = Number(element)
                sumNilaiTransaksiHibah = sumNilaiTransaksiHibah + JualBeliTotal;

            }
            setnilaiTransaksiHibah(sumNilaiTransaksiHibah)
            // Jumlah Nilai total HIBAH

             // Jumlah Nilai total Hibah SSP
             var sumNilaiTransaksiHibahSSP = 0;
             for (let i = 0; i< Hibah.length; i++) {
                 const element = Hibah[i].ssp_rp;
                 const JualBeliTotal = Number(element)
                 sumNilaiTransaksiHibahSSP = sumNilaiTransaksiHibahSSP + JualBeliTotal;
 
             }
             setnilaiTransaksiHibahSSP(sumNilaiTransaksiHibahSSP)
             // Jumlah Nilai total Hibah SSP

              // Jumlah Nilai total Hibah SSB
              var sumNilaiTransaksiHibahSSB = 0;
              for (let i = 0; i< Hibah.length; i++) {
                  const element = Hibah[i].ssb_rp;
                  const JualBeliTotal = Number(element)
                  sumNilaiTransaksiHibahSSB = sumNilaiTransaksiHibahSSB + JualBeliTotal;
  
              }
              setnilaiTransaksihibahSSB(sumNilaiTransaksiHibahSSB)
              // Jumlah Nilai total Hibah SSB

  // HIBAH END

  // APHB

           // Jumlah Luas Tanah APHB
           var sumLuasTanahAPHB = 0;
           for (let i = 0; i< aphb.length; i++) {
               const element = aphb[i].luas_tanah;
               const JualBeliTotal = Number(element)
               sumLuasTanahAPHB = sumLuasTanahAPHB + JualBeliTotal;

           }
           setluasTanahAphb(sumLuasTanahAPHB)
           // Jumlah Luas Tanah APHB

            // Jumlah Nilai total APHB
            var sumNilaiTransaksiAPHB = 0;
            for (let i = 0; i< aphb.length; i++) {
                const element = aphb[i].nilai_transaksi	;
                const JualBeliTotal = Number(element)
                sumNilaiTransaksiAPHB = sumNilaiTransaksiAPHB + JualBeliTotal;

            }
            setnilaiTransaksiAphb(sumNilaiTransaksiAPHB)
            // Jumlah Nilai total APHB

               // Jumlah Nilai total APHB SSP
               var sumNilaiTransaksiAPHBSSP = 0;
               for (let i = 0; i< aphb.length; i++) {
                   const element = aphb[i].ssp_rp;
                   const JualBeliTotal = Number(element)
                   sumNilaiTransaksiAPHBSSP = sumNilaiTransaksiAPHBSSP + JualBeliTotal;
   
               }
               setnilaiTransaksiAphbSSP(sumNilaiTransaksiAPHBSSP)
               // Jumlah Nilai total APHB SSP
  
                // Jumlah Nilai total APHB SSB
                var sumNilaiTransaksiAPHBSSB = 0;
                for (let i = 0; i< aphb.length; i++) {
                    const element = aphb[i].ssb_rp;
                    const JualBeliTotal = Number(element)
                    sumNilaiTransaksiAPHBSSB = sumNilaiTransaksiAPHBSSB + JualBeliTotal;
    
                }
                setnilaiTransaksiAphbSSB(sumNilaiTransaksiAPHBSSB)
                // Jumlah Nilai total APHB SSB

  // APHB END


  // APHT

           // Jumlah Luas Tanah APHB
           var sumLuasTanahAPHT = 0;
           for (let i = 0; i< apht.length; i++) {
               const element = apht[i].luas_tanah;
               const JualBeliTotal = Number(element)
               sumLuasTanahAPHT = sumLuasTanahAPHT + JualBeliTotal;

           }
           setluasTanahApht(sumLuasTanahAPHT)
           // Jumlah Luas Tanah APHB

            // Jumlah Nilai total APHB
            var sumNilaiTransaksiAPHT = 0;
            for (let i = 0; i< apht.length; i++) {
                const element = apht[i].nilai_transaksi	;
                const JualBeliTotal = Number(element)
                sumNilaiTransaksiAPHT = sumNilaiTransaksiAPHT + JualBeliTotal;

            }
            setnilaiTransaksiApht(sumNilaiTransaksiAPHT)
            // Jumlah Nilai total APHB

              // Jumlah Nilai total APHT SSP
              var sumNilaiTransaksiAPHTSSP = 0;
              for (let i = 0; i< apht.length; i++) {
                  const element = apht[i].ssp_rp;
                  const JualBeliTotal = Number(element)
                  sumNilaiTransaksiAPHTSSP = sumNilaiTransaksiAPHTSSP + JualBeliTotal;
  
              }
              setnilaiTransaksiAphtSSP(sumNilaiTransaksiAPHTSSP)
              // Jumlah Nilai total APHT SSP
 
               // Jumlah Nilai total APHT SSB
               var sumNilaiTransaksiAPHTSSB = 0;
               for (let i = 0; i< apht.length; i++) {
                   const element = apht[i].ssb_rp;
                   const JualBeliTotal = Number(element)
                   sumNilaiTransaksiAPHTSSB = sumNilaiTransaksiAPHTSSB + JualBeliTotal;
   
               }
               setnilaiTransaksiAphtSSB(sumNilaiTransaksiAPHTSSB)
               // Jumlah Nilai total APHT SSB

  // APHT END
   
           
             setData(res.data)
           }
       },(err)=>{
       //   setLoading(false)
         console.log(err)
       })
   }

   const handleUploadData = e =>{
       var post = {
        nik:user[0].nik,
        bulan_ini:date,
        nama_ppat:user[0].nama_lengkap,
        jumlah_jual_beli:jualBeliJenis,
        total_luas_tanah_jual_beli:luasTanahJB,
        total_nilai_jual_beli:nilaiTransaksiJB,
        jumlah_tukar_menukar:TukarMenukarJenis,
        total_luas_tanah_tukar_menukar:luasTanahTukarMenukar,
        total_nilai_tukar_menukar:nilaiTransaksiTukarMenukar,
        jumlah_hibah:hibahJenis,
        total_luas_tanah_hibah:luasTanahHibah,
        total_nilai_hibah:nilaiTransaksiHibah,
        jumlah_aphb:APHBJenis,
        total_luas_tanah_aphb:luasTanahAphb,
        total_nilai_aphb:nilaiTransaksiAphb,
        jumlah_apht:APHTJenis,
        total_luas_tanah_apht:luasTanahApht,
        total_nilai_apht:nilaiTransaksiApht,
        total_nihil:NihilJenis,
        total_nilai:totalTransasksi,
        total_ssp:totalSSP,
        total_ssb:totalSSB,
        tanggal_laporan:date1+"-"+month+"-"+year
}

axios.post(""+window.server+"rest-api/ppat/laporan/insertlaporanlengkap.php",post)
    .then((res)=>{
        alert(JSON.stringify(res.data))
        window.location.reload();
    },(err)=>{
        console.log(err)
    })
   }

   const handleUpdateData = e =>{
    
    axios.get(""+window.server+"rest-api/ppat/laporan/readlaporanlengkap.php?nik="+user[0].nik+"&bulan_ini="+date+"")
    .then((res)=>{
        // alert(JSON.stringify(res.data[0].id))
        // setID(res.data[0].id)
        var post = {
            id : res.data[0].id,
            nik:user[0].nik,
            bulan_ini:date,
            nama_ppat:user[0].nama_lengkap,
            jumlah_jual_beli:jualBeliJenis,
            total_luas_tanah_jual_beli:luasTanahJB,
            total_nilai_jual_beli:nilaiTransaksiJB,
            jumlah_tukar_menukar:TukarMenukarJenis,
            total_luas_tanah_tukar_menukar:luasTanahTukarMenukar,
            total_nilai_tukar_menukar:nilaiTransaksiTukarMenukar,
            jumlah_hibah:hibahJenis,
            total_luas_tanah_hibah:luasTanahHibah,
            total_nilai_hibah:nilaiTransaksiHibah,
            jumlah_aphb:APHBJenis,
            total_luas_tanah_aphb:luasTanahAphb,
            total_nilai_aphb:nilaiTransaksiAphb,
            jumlah_apht:APHTJenis,
            total_luas_tanah_apht:luasTanahApht,
            total_nilai_apht:nilaiTransaksiApht,
            total_nihil:NihilJenis,
            total_nilai:totalTransasksi,
            total_ssp:totalSSP,
            total_ssb:totalSSB,
            tanggal_laporan:date1+"-"+month+"-"+year

    }
        axios.post(""+window.server+"rest-api/ppat/laporan/updatelaporanlengkap.php",post)
        .then((res)=>{
            // setID(res.data[0].id)
            alert(JSON.stringify(res.data))
            window.location.reload();
        })


    })

 
       


   }

   function handleFilterButton(){
     // Get Filter Button Upload
     axios.get(""+window.server+"rest-api/ppat/laporan/readlaporanlengkap.php?nik="+user[0].nik+"&bulan_ini="+date+"")
     .then((res)=>{
       if (res.data.message === "No post found") {
         setButtonUpload(true)
        // alert(JSON.stringify(user[0].nik))
       } else if (date === res.data[0].bulan_ini) {
            setButtonUpload(false)
       } else if(date !== res.data[0].bulan_ini) {
        setButtonUpload(true)

       }
     })
   }
    return(
  <div>
        <table border="1" id="table-to-xls">
   <tr>
       <th style={{textAlign:'center'}} rowSpan="2">No Urut</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} colSpan="2">Akta</th>
       <th style={{textAlign:'center'}} rowSpan="2">Bentuk Perbuatan hukum</th>
       <th style={{textAlign:'center'}} colSpan="2">NAMA,ALAMAT dan NPWP</th>
       <th style={{textAlign:'center'}} rowSpan="2">Jenis dan nomor hak</th>
       <th style={{textAlign:'center'}} rowSpan="2">Letak tanah dan bangunan</th>
       <th style={{textAlign:'center'}} colSpan="2">Luas</th>
       <th style={{textAlign:'center'}} rowSpan="2">Nilai Transaksi</th>
       <th style={{textAlign:'center'}} colSpan="2">SPPT PBB</th>
       <th style={{textAlign:'center'}} colSpan="2">SSP</th>
       <th style={{textAlign:'center'}} colSpan="2">SSB</th>
       <th style={{textAlign:'center'}}>Ket</th>
       
   </tr>
   <tr>
       <th style={{padding:10,textAlign:'center'}}>Nomor</th>
       <th style={{padding:10,textAlign:'center'}}>Tanggal</th>
       {/* <th style={{padding:10}}>Bentuk Perbuatan hukum</th> */}
       <th style={{padding:10,textAlign:'center'}}>pihak yang mengalihkan</th>
       <th  style={{padding:10,textAlign:'center'}} >pihak yang menerima</th>
       {/* <th  style={{padding:10}}>Jenis dan nomor hak</th> */}
       {/* <th  style={{padding:10}}>letak tanah dan bangunan</th> */}
       <th  style={{padding:10,textAlign:'center'}}>Tanah</th>
       <th  style={{padding:10,textAlign:'center'}}>Bangunan</th>
       {/* <th  style={{padding:10}}>Nilai Transaksi</th> */}
       <th  style={{padding:10,textAlign:'center'}}>NOP/Tahun</th>
       <th  style={{padding:10,textAlign:'center'}}>NJOP (Rp)</th>
       <th  style={{padding:10,textAlign:'center'}}>Tanggal</th>
       <th  style={{padding:10,textAlign:'center'}}>Rp</th>
       <th  style={{padding:10,textAlign:'center'}}>Tanggal</th>
       <th  style={{padding:10,textAlign:'center'}}>Rp</th>
       <th style={{padding:10,textAlign:'center'}}>Ket</th>
       
   </tr>
   <tr>
       <th style={{padding:10,textAlign:'center'}}>1</th>
       <th style={{padding:10,textAlign:'center'}}>2</th>
       <th style={{padding:10,textAlign:'center'}}>3</th>
       <th style={{padding:10,textAlign:'center'}}>4</th>
       <th  style={{padding:10,textAlign:'center'}}>5</th>
       <th  style={{padding:10,textAlign:'center'}}>6</th>
       <th  style={{padding:10,textAlign:'center'}}>7</th>
       <th  style={{padding:10,textAlign:'center'}}>8</th>
       <th  style={{padding:10,textAlign:'center'}}>9</th>
       <th  style={{padding:10,textAlign:'center'}}>10</th>
       <th  style={{padding:10,textAlign:'center'}}>11</th>
       <th  style={{padding:10,textAlign:'center'}}>12</th>
       <th  style={{padding:10,textAlign:'center'}}>13</th>
       <th  style={{padding:10,textAlign:'center'}}>14</th>
       <th  style={{padding:10,textAlign:'center'}}>15</th>
       <th  style={{padding:10,textAlign:'center'}}>16</th>
       <th style={{padding:10,textAlign:'center'}}>17</th>
       <th style={{padding:10,textAlign:'center'}}>18</th>
       
   </tr>
   {
       data === "" ?
       <></>
       :
       data.map((res,index)=>{
        return(
          <tr>
            <th style={{padding:10,textAlign:'center'}} >{index+1}</th>
            <th style={{padding:10}}>{res.akta_nomor}</th>
            <th style={{padding:10}}>{res.akta_tanggal}</th>
            <th style={{padding:10}}>{res.bentuk_perbuatan_hukum}</th>
            <th  style={{padding:10}}>{res.nama_pengalihan}</th>
            <th  style={{padding:10}}>{res.nama_penerima}</th>
            <th  style={{padding:10}}>{res.jenis_dan_nomor_hak}</th>
            <th  style={{padding:10}}>{res.letak_tanah_dan_bangunan}</th>
            <th  style={{padding:10}}>{res.luas_tanah}</th>
            <th  style={{padding:10}}>{res.luas_bangunan}</th>
            <th  style={{padding:10}}>{res.nilai_transaksi}</th>
            <th  style={{padding:10}}>'{res.nop_tahun}</th>
            <th  style={{padding:10}}>{res.njop_rp}</th>
            <th  style={{padding:10}}>{res.ssp_tanggal}</th>
            <th  style={{padding:10}}>{res.ssp_rp}</th>
            <th  style={{padding:10}}>{res.ssb_tanggal}</th>
            <th style={{padding:10}}>{res.ssb_rp}</th>
            <th style={{padding:10}}>{res.ket}</th>
        
    </tr>
        
        )
      })
   }
 
  
   
</table>
{/* <div style={{margin:20}}>
<strong>Total Bulan ini</strong>
<div style={{marginTop:10}}>

<strong>Jual Beli</strong>


<p>Total Jual Beli : <strong>{jualBeliJenis}</strong> </p>
<p>Luas Tanah Jual Beli : <strong>{luasTanahJB}</strong> </p>
<p>Nilai Transaksi Jual Beli : <strong>{nilaiTransaksiJB}</strong> </p>
<p>Total SSP Jual Beli : <strong>{nilaiTransaksiJBSSP}</strong> </p>
<p>Total SSB Jual Beli : <strong>{nilaiTransaksiJBSSB}</strong> </p>

<strong>Tukar Menukar</strong>


<p>Total Tukar Menukar : <strong>{TukarMenukarJenis}</strong> </p>
<p>Luas Tanah Tukar Menukar : <strong>{luasTanahTukarMenukar}</strong> </p>
<p>Nilai Transaksi Tukar Menukar : <strong>{nilaiTransaksiTukarMenukar}</strong> </p>
<p>Total SSP Tukar Menukar  : <strong>{nilaiTransaksiTukarMenukarSSP}</strong> </p>
<p>Total SSB Tukar Menukar : <strong>{nilaiTransaksiTukarMenukarSSB}</strong> </p>

<strong>Hibah</strong>


<p>Total Hibah : <strong>{hibahJenis}</strong> </p>
<p>Luas Tanah Hibah : <strong>{luasTanahHibah}</strong> </p>
<p>Nilai Transaksi Hibah : <strong>{nilaiTransaksiHibah}</strong> </p>
<p>Total SSP Hibah  : <strong>{nilaiTransaksiHibahSSP}</strong> </p>
<p>Total SSB Hibah : <strong>{nilaiTransaksiHibahSSB}</strong> </p>

<strong>APHB</strong>


<p>Total  APHB : <strong>{APHBJenis}</strong> </p>
<p>Luas Tanah APHB : <strong>{luasTanahAphb}</strong> </p>
<p>Nilai Transaksi APHB : <strong>{nilaiTransaksiAphb}</strong> </p>
<p>Total SSP APHB  : <strong>{nilaiTransaksiAphbSSP}</strong> </p>
<p>Total SSB APHB : <strong>{nilaiTransaksiAphbSSB}</strong> </p>

<strong>APHT</strong>

<p>Total APHT : <strong>{APHTJenis}</strong> </p>
<p>Luas Tanah APHT : <strong>{luasTanahApht}</strong> </p>
<p>Nilai Transaksi APHT : <strong>{nilaiTransaksiApht}</strong> </p>
<p>Total SSP APHT  : <strong>{nilaiTransaksiAphtSSP}</strong> </p>
<p>Total SSB APHT : <strong>{nilaiTransaksiAphtSSB}</strong> </p>

<strong>Total SSP dan SSB</strong>

<p>Total SSP  : <strong>{totalSSP}</strong> </p>
<p>Total SSB  : <strong>{totalSSB}</strong> </p>




</div>
</div> */}

<div style={{marginBottom:'5%'}}>
<ReactHTMLTableToExcel
                    
                    id="test-table-xls-button"
                    className="download-table-xls-button button-export"
                    table="table-to-xls"
                    filename="Laporan Bulanan"
                    sheet="Laporan Bulanan"
                    buttonText="Download EXCEL"/>
              {
                buttonUpload === true &&
                <button onClick={handleUploadData}  style={{marginLeft:20}}>
                Upload Data Bulan Ini di BPN
                </button>
          
            }
            {
                buttonUpload === false &&
                <button onClick={handleUpdateData}  style={{marginLeft:20}}>
                Update Data Bulan Ini di BPN
                </button>
          
            }
 
 

</div>



   </div>

    )
    
}

export default ExportLaporan