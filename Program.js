$(document).ready(()=>{
    loadCsvArchive((data)=>{
        cepsArray = parseCsvToarray(data);
        buscaEnderecoByCep(cepsArray)
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
    CEP;Logradouro='';Complemento='';Bairro='';Localidade='';UF='';Unidade='';IBGE='';GIA='';complete=false;
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

async function buscaEnderecoByCep(cepsArray) {
    $('#loadind_ends').empty().append("Carregando aguarde...")
    for(i in cepsArray){
        await acessaApiExterna(cepsArray,i)
    }
    $('#loadind_ends').empty().append("Busca concluida")
    gravaNovoArquivo(cepsArray);
}

async function acessaApiExterna(cepsArray,item) {
    cepObj = cepsArray[item]
    cepNumber = cepObj.CEP
    url = `https://viacep.com.br/ws/${cepNumber}/json/?;`
    try{
        await $.ajax({
            url,
            async: false,
            dataType: 'jsonp',
            success: function(result){
                console.log(result);
                cepsArray[item] = parseEnderecoJson(result) 
            },
            error: function(request, status, error) {
                if(status != 200){
                    console.log(status,error)
                }
            }
        });
    }catch(e){
        console.log(e)
    }
    
}


function parseEnderecoJson(json) {
    try{
        cepObj = new endereco(json.cep)
        cepObj.Logradouro = json.logradouro
        cepObj.Complemento = json.complemento
        cepObj.Bairro = json.bairro
        cepObj.Localidade = json.localidade
        cepObj.UF = json.uf
        cepObj.IBGE = json.ibge
        cepObj.GIA = json.gia
        cepObj.complete = true
    }catch(e){
        console.log(e)
    }
    return cepObj;
        
}

function gravaNovoArquivo(cepsArray) {
    let novoCsv = `CEP;Logradouro;Complemento;Bairro;Localidade;UF;Unidade;IBGE;GIA\n`
    cepsArray.forEach((endereco)=>{
        line = `${endereco.CEP};${endereco.Logradouro};${endereco.Complemento};${endereco.Bairro};${endereco.Localidade};${endereco.UF};${endereco.Unidade};${endereco.IBGE};${endereco.GIA}\n`
        novoCsv+= line
    })
    $("#ends").empty().append(novoCsv);
        
    let blob = new Blob([novoCsv],{type: "text/plain;charset=utf=8"});
    saveAs(blob,"CepsComEndereco.csv") 
}