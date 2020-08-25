$(document).ready(()=>{
    loadCsvArchive((data)=>{
        $("#desordenado").empty().append(data)
        censoArray = parseCsvToarray(data);
        censoOrdenado = bubleSort(censoArray);
        gravaNovoArquivo(censoOrdenado)
    })
})

const loadCsvArchive = (calback)=>{
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
        return (this.Populacao*2)
    }
}

function parseCsvToarray(data) {
    let allLines = data.split(/\r\n|\n/)
    mapa = []
    allLines.shift();//remove header do csv
    allLines.forEach(line => {
        csvKey = line.split(";")
        if(csvKey[0]) mapa.push(new censo(csvKey[0],csvKey[1]))
    });
    return mapa
}

function bubleSort(censoArray) {
    const compare = (censo1,censo2)=>(censo1.getPopulacao() > censo2.getPopulacao())? true : false
    let tam = censoArray.length;
    let trocado;
    do{
        trocado = false
        for (let i = 0; i < tam-1; i++) {
            if(compare(censoArray[i],censoArray[i+1])){
                let itemAtual = censoArray[i]
                censoArray[i] = censoArray[i+1]
                censoArray[i+1] = itemAtual
                trocado = true;
            }
            
        }
    }while(trocado)//realiza a operacao enquanto nao passar ao menos 1 vez pelo array sem trocas
    return censoArray;
}

function gravaNovoArquivo(mapa) {
    let novoCsv = `"Local"; "Populacao no ultimo censo"\n`
    mapa.forEach(censo=>{
        novoCsv += `${censo.getLocal()};${censo.getPopulacaoDobro()} \n`
    })
    $("#ordenado").empty().append(novoCsv)

    // let blob = new Blob([novoCsv],{type: "text/plain;charset=utf=8"});
    // saveAs(blob,"mapaPopulacaoDuplicada.csv")
}