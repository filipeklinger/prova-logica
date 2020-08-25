function bubleSort(array) {
    return array.sort(compare)
}

function compare(censo1,censo2) {
    return (censo1.getPopulacao() > censo2.getPopulacao())? 1 : -1
}