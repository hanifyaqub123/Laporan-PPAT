import React,{useEffect, useState} from "react";
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



const ExportLaporanAdmin = () =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const date = localStorage.getItem("today")
    const [data,setData] = useState("");

    // Value total
    const [totalJB,settotalJB] = useState();
    const [totalLuasTanahJB,setLuasTanahJB] = useState();
    const [totalNilaiTransaksiJB,setNilaiTransaksiJB] = useState();

    const [totalTukarMenukar,setTukarMenukar] = useState();
    const [totalLuasTanahTukarMenukar,setLuasTanahTukarMenukar] = useState();
    const [totalNilaiTransaksiTukarMenukar,setNilaiTransaksiTukarMenukar] = useState();
    

    const [totalHibah,settotalHibah] = useState();
    const [totalLuasTanahHibah,setLuasTanahHibah] = useState();
    const [totalNilaiTransaksiHibah,setNilaiTransaksiHibah] = useState();
    

    const [totalAPHB,settotalAPHB] = useState();
    const [totalLuasTanahAPHB,setLuasTanahAPHB] = useState();
    const [totalNilaiTransaksiAPHB,setNilaiTransaksiAPHB] = useState();
    

    const [totalAPHT,settotalAPHT] = useState();
    const [totalLuasTanahAPHT,setLuasTanahAPHT] = useState();
    const [totalNilaiTransaksiAPHT,setNilaiTransaksiAPHT] = useState();
    
    const [totalNihil,settotalNihil] = useState();
    const [totalNilai,settotalNilai] = useState();
    const [totalNilaiSSP,setNilaiSSP] = useState();
    const [totalNilaiSSB,setNilaiSSB] = useState();
    

    useEffect(()=>{
      handleValueTable()

    
    },[])

    function handleValueTable(){
      axios.get(""+window.server+"rest-api/ppat/laporan/readlaporanlengkapadmin.php?bulan_ini="+date+"")
      .then((res)=>{
        if (res.data.message === "No post found") {
          //   setLoading(false)
            alert("Maaf data tidak tersedia")
          }else{

        // JUAL BELI 

        // Nilai Jenis 
        var sumJenisJB = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].jumlah_jual_beli;
            const JualBeliTotal = Number(element)
            sumJenisJB = sumJenisJB + JualBeliTotal;
  
        }
        settotalJB(sumJenisJB)

        // Luas Tanah 
          var sumLuasTanahJB = 0;
          for (let i = 0; i< res.data.length; i++) {
              const element = res.data[i].total_luas_tanah_jual_beli;
              const JualBeliTotal = Number(element)
              sumLuasTanahJB = sumLuasTanahJB + JualBeliTotal;
    
          }
        setLuasTanahJB(sumLuasTanahJB)

        // Nilai transaksi

        var sumNilaiTransaksiJB = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nilai_jual_beli;
            const JualBeliTotal = Number(element)
            sumNilaiTransaksiJB = sumNilaiTransaksiJB + JualBeliTotal;
  
        }
        setNilaiTransaksiJB(sumNilaiTransaksiJB)

        // JUAL BELI END

      // JUAL Tukar Menukar 

        // Nilai Jenis 
        var sumJenisTukarMenukar = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].jumlah_tukar_menukar;
            const JualBeliTotal = Number(element)
            sumJenisTukarMenukar = sumJenisTukarMenukar + JualBeliTotal;
  
        }
        setTukarMenukar(sumJenisTukarMenukar)

        // Luas Tanah 
          var sumLuasTanahTukarMenukar = 0;
          for (let i = 0; i< res.data.length; i++) {
              const element = res.data[i].total_luas_tanah_tukar_menukar;
              const JualBeliTotal = Number(element)
              sumLuasTanahTukarMenukar = sumLuasTanahTukarMenukar + JualBeliTotal;
    
          }
          setLuasTanahTukarMenukar(sumLuasTanahTukarMenukar)

        // Nilai transaksi

        var sumNilaiTransaksiTukarMenukar = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nilai_tukar_menukar;
            const JualBeliTotal = Number(element)
            sumNilaiTransaksiTukarMenukar = sumNilaiTransaksiTukarMenukar + JualBeliTotal;
  
        }
        setNilaiTransaksiTukarMenukar(sumNilaiTransaksiTukarMenukar)

        // Tukar Menukar END

         // HIBAH 

        // Nilai Jenis 
        var sumJenisHibah = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].jumlah_hibah;
            const JualBeliTotal = Number(element)
            sumJenisHibah = sumJenisHibah + JualBeliTotal;
  
        }
        settotalHibah(sumJenisHibah)

        // Luas Tanah 
          var sumLuasTanahHibah = 0;
          for (let i = 0; i< res.data.length; i++) {
              const element = res.data[i].total_luas_tanah_hibah;
              const JualBeliTotal = Number(element)
              sumLuasTanahHibah = sumLuasTanahHibah + JualBeliTotal;
    
          }
          setLuasTanahHibah(sumLuasTanahHibah)

        // Nilai transaksi

        var sumNilaiTransaksiHibah = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nilai_hibah;
            const JualBeliTotal = Number(element)
            sumNilaiTransaksiHibah = sumNilaiTransaksiHibah + JualBeliTotal;
  
        }
        setNilaiTransaksiHibah(sumNilaiTransaksiHibah)

        // HIBAH END

           // APHB 

        // Nilai Jenis 
        var sumJenisAPHB = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].jumlah_aphb;
            const JualBeliTotal = Number(element)
            sumJenisAPHB = sumJenisAPHB + JualBeliTotal;
  
        }
        settotalAPHB(sumJenisAPHB)

        // Luas Tanah 
          var sumLuasTanahAPHB = 0;
          for (let i = 0; i< res.data.length; i++) {
              const element = res.data[i].total_luas_tanah_aphb;
              const JualBeliTotal = Number(element)
              sumLuasTanahAPHB = sumLuasTanahAPHB + JualBeliTotal;
    
          }
          setLuasTanahAPHB(sumLuasTanahAPHB)

        // Nilai transaksi

        var sumNilaiTransaksiAPHB = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nilai_aphb;
            const JualBeliTotal = Number(element)
            sumNilaiTransaksiAPHB = sumNilaiTransaksiAPHB + JualBeliTotal;
  
        }
        setNilaiTransaksiAPHB(sumNilaiTransaksiAPHB)

        // APHB END

         // APHT

        // Nilai Jenis 
        var sumJenisAPHT = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].jumlah_apht;
            const JualBeliTotal = Number(element)
            sumJenisAPHT = sumJenisAPHT + JualBeliTotal;
  
        }
        settotalAPHT(sumJenisAPHT)

        // Luas Tanah 
          var sumLuasTanahAPHT = 0;
          for (let i = 0; i< res.data.length; i++) {
              const element = res.data[i].total_luas_tanah_apht;
              const JualBeliTotal = Number(element)
              sumLuasTanahAPHT = sumLuasTanahAPHT + JualBeliTotal;
    
          }
          setLuasTanahAPHT(sumLuasTanahAPHT)

        // Nilai transaksi

        var sumNilaiTransaksiAPHT = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nilai_apht;
            const JualBeliTotal = Number(element)
            sumNilaiTransaksiAPHT = sumNilaiTransaksiAPHT + JualBeliTotal;
  
        }
        setNilaiTransaksiAPHT(sumNilaiTransaksiAPHT)

        // APHT END

        // Niilai Total SSB
        var sumNilaiTotal = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nilai;
            const JualBeliTotal = Number(element)
            sumNilaiTotal = sumNilaiTotal + JualBeliTotal;
  
        }
        settotalNilai(sumNilaiTotal)

        // Nihil
        var sumNilaiNihil = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_nihil;
            const JualBeliTotal = Number(element)
            sumNilaiNihil = sumNilaiNihil + JualBeliTotal;
  
        }
        settotalNihil(sumNilaiNihil)

         // Niilai Total SSB
         var sumNilaiSSP = 0;
         for (let i = 0; i< res.data.length; i++) {
             const element = res.data[i].total_ssp;
             const JualBeliTotal = Number(element)
             sumNilaiSSP = sumNilaiSSP + JualBeliTotal;
   
         }
         setNilaiSSP(sumNilaiSSP)

        // Niilai Total SSB
        var sumNilaiSSB = 0;
        for (let i = 0; i< res.data.length; i++) {
            const element = res.data[i].total_ssb;
            const JualBeliTotal = Number(element)
            sumNilaiSSB = sumNilaiSSB + JualBeliTotal;
  
        }
        setNilaiSSB(sumNilaiSSB)
        setData(res.data)
      }
        
      },(err)=>{
        console.log(err)
      })

  
    }
    return(
  <div>
        <table border="1" id="table-to-xls">
   <tr>
       <th style={{textAlign:'center'}} rowSpan="2">No</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} rowSpan="2">Nama PPAT</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} rowSpan="2">Tanggal Laporan</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} colSpan="15">Jenis Akta</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} rowSpan="2">Jumlah Nilai</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} rowSpan="2">Jumlah Nihil</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} rowSpan="2">SSP</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}} rowSpan="2">SSB</th>

       
   </tr>
   <tr>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>JB</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Luas Tanah</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Nilai Transaksi</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Tukar Menukar</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Luas Tanah</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Nilai Transaksi</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Hibah</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Luas Tanah</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Nilai Transaksi</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>APHB</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Luas Tanah</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Nilai Transaksi</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>APHT</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Luas Tanah</th>
       <th style={{paddingTop:10,paddingBottom:10,textAlign:'center'}}>Nilai Transaksi</th>

        

       
   </tr>

   {
       data === "" ?
       <></>
       :
       data.map((res,index)=>{
        return(
          <tr>
            <th style={{padding:10,textAlign:'center'}} >{index+1}</th>
            <th style={{padding:10}}>{res.nama_ppat}</th>
            <th style={{padding:10}}>{res.tanggal_laporan}</th>
            <th style={{padding:10}}>{res.jumlah_jual_beli}</th>
            <th style={{padding:10}}>{res.total_luas_tanah_jual_beli}</th>
            <th  style={{padding:10}}>{res.total_nilai_jual_beli}</th>
            <th  style={{padding:10}}>{res.jumlah_tukar_menukar}</th>
            <th  style={{padding:10}}>{res.total_luas_tanah_tukar_menukar}</th>
            <th  style={{padding:10}}>{res.total_nilai_tukar_menukar}</th>
            <th  style={{padding:10}}>{res.jumlah_hibah}</th>
            <th  style={{padding:10}}>{res.total_luas_tanah_hibah}</th>
            <th  style={{padding:10}}>{res.total_nilai_hibah}</th>
            <th  style={{padding:10}}>{res.jumlah_aphb}</th>
            <th  style={{padding:10}}>{res.total_luas_tanah_aphb}</th>
            <th  style={{padding:10}}>{res.total_nilai_aphb}</th>
            <th  style={{padding:10}}>{res.jumlah_apht}</th>
            <th  style={{padding:10}}>{res.total_luas_tanah_apht}</th>
            <th style={{padding:10}}>{res.total_nilai_apht}</th>
            <th style={{padding:10}}>{res.total_nilai}</th>
            <th style={{padding:10}}>{res.total_nihil}</th>
            <th style={{padding:10}}>{res.total_ssp}</th>
            <th style={{padding:10}}>{res.total_ssb}</th>

        
    </tr>
        
        )
      })
   }

<tr>
            <th style={{padding:10,textAlign:'center'}} colSpan="3" >Jumlah</th>
            <th style={{padding:10}}>{totalJB}</th>
            <th style={{padding:10}}>{totalLuasTanahJB}</th>
            <th  style={{padding:10}}>{totalNilaiTransaksiJB}</th>
            <th  style={{padding:10}}>{totalTukarMenukar}</th>
            <th  style={{padding:10}}>{totalLuasTanahTukarMenukar}</th>
            <th  style={{padding:10}}>{totalNilaiTransaksiTukarMenukar}</th>
            <th  style={{padding:10}}>{totalHibah}</th>
            <th  style={{padding:10}}>{totalLuasTanahHibah}</th>
            <th  style={{padding:10}}>{totalNilaiTransaksiHibah}</th>
            <th  style={{padding:10}}>{totalAPHB}</th>
            <th  style={{padding:10}}>{totalLuasTanahAPHB}</th>
            <th  style={{padding:10}}>{totalNilaiTransaksiAPHB}</th>
            <th  style={{padding:10}}>{totalAPHT}</th>
            <th  style={{padding:10}}>{totalLuasTanahAPHT}</th>
            <th style={{padding:10}}>{totalNilaiTransaksiAPHT}</th>
            <th style={{padding:10}}>{totalNilai}</th>
            <th style={{padding:10}}>{totalNihil}</th>
            <th style={{padding:10}}>{totalNilaiSSP}</th>
            <th style={{padding:10}}>{totalNilaiSSB}</th>

        
    </tr>
 
  
   
</table>
{/* <div style={{margin:20}}>
<strong>Total Bulan ini</strong>
<div style={{marginTop:10}}>
<p>Total Jual Beli : <strong>{jualBeliJenis}</strong> </p>
<p>Total Tukar Menukar : <strong>{TukarMenukarJenis}</strong> </p>
<p>Total Hibah : <strong>{hibahJenis}</strong> </p>
<p>Total APHB : <strong>{APHBJenis}</strong> </p>
<p>Total APHT : <strong>{APHTJenis}</strong></p>
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

 
 

</div>



   </div>

    )
    
}

export default ExportLaporanAdmin