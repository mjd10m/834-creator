const {formatDate, dtpDates} = require('./helpers')


const createLsLoop = (genData, memData, timestamp, subInd) => {
    if(subInd === 'Y') {
        var loopData = {
            name:['RATING AREA', 'PRE AMT 1','APTC AMT', 'PRE AMT TOT', 'TOT RES AMT','SOURCE EXCHANGE ID','REQUEST SUBMIT TIMESTAMP', 'CONVERSION', 'ENROLLMENT_STATUS', 'COVERAGE_STATUS', 'CSR AMT'],
            variable:[genData.rateArea, memData.premAmt, memData.aptcAmt, memData.premAmtTot, memData.totResAmt, genData.souExchId, formatDate('YYYYMMDDHHMMSS',timestamp), genData.convCarr, genData.enrollStatus, genData.covStatus, memData.csrAmt],
            ref:['9X','9X','9V','9X','9V','17','17','17','17','17','9V',]
        }
    } else {
        var loopData = {
            name:['RATING AREA', 'PRE AMT 1', 'SOURCE EXCHANGE ID','REQUEST SUBMIT TIMESTAMP', 'CONVERSION', 'ENROLLMENT_STATUS', 'COVERAGE_STATUS'],
            variable:[genData.rateArea, memData.premAmt, genData.souExchId, formatDate('YYYYMMDDHHMMSS',timestamp), genData.convCarr, genData.enrollStatus, genData.covStatus],
            ref:['9X','9X','17','17','17','17','17']
        }
    }
    const arr = loopData.name
    const lsLoop = arr.map((k, index) => {
        if(k === 'REQUEST SUBMIT TIMESTAMP') {
            return `LX*${index + 1}~
N1*75*${k}~
REF*${loopData.ref[index]}*${loopData.variable[index]}~`
        } else {
            return `LX*${index + 1}~
N1*75*${k}~
REF*${loopData.ref[index]}*${loopData.variable[index]}~
${dtpDates(genData.transDate,'','007')}`
        }
}).join('\n');

    return lsLoop

}

module.exports = createLsLoop