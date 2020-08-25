$(document).ready(()=>{
    getCsvArchive((data)=>{
        $("#loading").empty().append(data)
    })
})

const getCsvArchive = (calback)=>{
    $.ajax({
        type:"GET",
        url:"mapa.csv",
        dataType: "text",
        success: (data)=> calback(data)
    })
}