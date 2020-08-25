function bubleSort(censoArray) {
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

function compare(censo1,censo2) {
    return (censo1.getPopulacao() > censo2.getPopulacao())? true : false
}