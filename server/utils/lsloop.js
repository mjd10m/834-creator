const {formatDate, dtpDates, subDemo, formatInput} = require('./helpers')


const createLsLoop = (data, timestamp) => {
    const loopData = {
        name:['RATING AREA', 'PRE AMT 1','APTC AMT', 'PRE AMT TOT', 'TOT RES AMT','SOURCE EXCHANGE ID','REQUEST SUBMIT TIMESTAMP', 'CONVERSION', 'ENROLLMENT_STATUS', 'COVERAGE_STATUS', 'CSR AMT'],
        variable:[data.rateArea, data.premAmt, data.aptcAmt, data.premAmtTot,data.totResAmt, data.souExchId, formatDate('YYYYMMDDHHMMSS',timestamp), data.convCarr, data.enrollStatus, data.covStatus, data.csrAmt],
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
${dtpDates(data.transDate,'','007')}`
        }
}).join('\n');

    return lsLoop

}

module.exports = createLsLoop