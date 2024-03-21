const {formatDate, dtpDates} = require('./helpers')


const createLsLoop = (genData, subData, timestamp) => {
    const loopData = {
        name:['RATING AREA', 'PRE AMT 1','APTC AMT', 'PRE AMT TOT', 'TOT RES AMT','SOURCE EXCHANGE ID','REQUEST SUBMIT TIMESTAMP', 'CONVERSION', 'ENROLLMENT_STATUS', 'COVERAGE_STATUS', 'CSR AMT'],
        variable:[genData.rateArea, subData.premAmt, subData.aptcAmt, subData.premAmtTot, subData.totResAmt, genData.souExchId, formatDate('YYYYMMDDHHMMSS',timestamp), genData.convCarr, genData.enrollStatus, genData.covStatus, subData.csrAmt],
        ref:['9X','9X','9V','9X','9V','17','17','17','17','17','9V',]
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