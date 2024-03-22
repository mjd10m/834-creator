const {formatDate, dtpDates, subDemo, formatInput, formatName} = require('./helpers');
const createInsLoop = require('./insloop.js')
const moment = require('moment')

const createStLoop = (genData, subData, depData) => {
    const timestamp = moment()
    let stLoop =
`ST*834*000002000*005010X220A1~
BGN*00*${subData.exchId}*${formatDate('YYYYMMDD',timestamp)}*${formatDate('HHmmssSS',timestamp)}*ET***2~
DTP*007*D8*${formatDate('YYYYMMDD',timestamp)}~
QTY*ET*1~
QTY*DT*${genData.depNum}~
QTY*TO*${(Number(genData.depNum) + 1)}~
N1*P5*${formatName(subData.memName)}*FI*${subData.ssn}~
N1*IN*${genData.payerName}*FI*${genData.payerId}~
N1*BO*${genData.brokerName}*FI*${genData.brokerId}~
${createInsLoop(genData, subData, timestamp)}
${genData.depNum > 0 ? depData.map((dep) => createInsLoop(genData, dep, timestamp, subData)) : ''}`



const loopCount = stLoop.split('~').length

stLoop = stLoop.concat(`\nSE*${loopCount}*000002000~`)


    return stLoop
}

module.exports = createStLoop