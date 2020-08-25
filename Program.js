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

class censo {
    Local = "";
    Populacao = 0;

    constructor(localName,populacao) {
        this.setLocal(localName)
        this.setPopulacao(populacao)
    }

    setLocal(local){
        this.Local = local? local : "Não informado";
    }

    setPopulacao(populacao){
        try {
            populacao = parseInt(populacao)
            this.Populacao = isNaN(populacao)? 0 : populacao
        } catch (e) {
            this.Populacao = 0
        }
    }

    getLocal() {
        return this.Local
    }
    getPopulacao() {
        return this.Populacao
    }

    getPopulacaoDobro(){
        return this.populacao*2
    }
}