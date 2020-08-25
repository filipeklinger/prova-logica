$(document).ready(()=>{
    loadCsvArchive((data)=>{
        cepsArray = parseCsvToarray(data);
        gravaNovoArquivo(cepsArray)
    })
})

const loadCsvArchive = (calback)=>{
    $.ajax({
        type:"GET",
        url:"CEPs.csv",
        dataType: "text",
        success: (data)=> calback(data)
    })
}
class endereco{
    CEP;Logradouro;Complemento;Bairro;Localidade;UF;Unidade;IBGE;GIA
    constructor(cep){
        this.setCep(cep)
    }

    setCep(cep){
        try {
            this.CEP = cep.match(/\d/g).join('');//regex p/ removev todos os caracteres nao 'Digito'
        } catch (e) {
            this.CEP = 0
        }
    }
}

function parseCsvToarray(data) {
    let allLines = data.split(/\r\n|\n/)
    ceps = []
    cepsView = $("#ceps")
    cepsView.empty()
    allLines.shift();//remove header do csv
    allLines.forEach(line => {
        csvKey = line.split(";")
        if(csvKey[0]){
            ceps.push(new endereco(csvKey[0]))
            cepsView.append(`${csvKey[0]} / `)
        } 
    });
    return ceps
}


function gravaNovoArquivo(cepsArray) {
    let novoCsv = `CEP;Logradouro;Complemento;Bairro;Localidade;UF;Unidade;IBGE;GIA\n`
    cepsArray.forEach((endereco)=>{
        novoCsv += `${endereco.CEP} \n`
    })
    $("#dig_ceps").empty().append(novoCsv)
    // let blob = new Blob([novoCsv],{type: "text/plain;charset=utf=8"});
    // saveAs(blob,"mapaPopulacaoOrdenado.csv")
}