const {formatDate, dtpDates, subDemo, formatInput, formatName} = require('./helpers');
const createLsLoop = require('./lsloop.js')
const moment = require('moment')

const createStLoop = (genData, subData) => {
    const timestamp = moment()
    let stLoop =
`ST*834*000002000*005010X220A1~
BGN*00*${subData.exchId}*${formatDate('YYYYMMDD',timestamp)}*${formatDate('HHmmssSS',timestamp)}*ET***2~
DTP*007*D8*${formatDate('YYYYMMDD',timestamp)}~
QTY*ET*1~
QTY*DT*${genData.depNum}~
QTY*TO*${(Number(genData.depNum) + 1)}~
N1*P5*${formatName(subData.subName)}*FI*${subData.ssn}~
N1*IN*${genData.payerName}*FI*${genData.payerId}~
N1*BO*${genData.brokerName}*FI*${genData.brokerId}~
INS*Y*18*021*EC*A*E**AC~
REF*0F*${subData.exchId}~
REF*17*${subData.exchId}~
REF*23*${subData.carrId}~
REF*ZZ*${subData.carrId}~
${dtpDates(genData.eligbDate,genData.eligbTermDate,356)}
${subDemo(subData)}
DMG*D8*${formatDate('YYYYMMDD',subData.dob)}*${formatInput(subData.gen)}**:RET:2106-3~
HLH*${formatInput(subData.smoke)}~
LUI*LE*ENG**7~
LUI*LE*ENG**6~
NM1*31*1~
N3*${subData.strAddr}~
N4*${subData.city}*${genData.state}*${subData.zCode}~
HD*021**${formatInput(subData.covType)}~
${dtpDates(genData.transDate,genData.transTermDate,348)}
REF*1L*${genData.policyNum}~
REF*CE*${genData.hiosId}~
REF*X9*${genData.policyNum}~
LS*2700~
${createLsLoop(genData, subData, timestamp)}
LE*2700~`

const loopCount = stLoop.split('~').length

stLoop = stLoop.concat(`\nSE*${loopCount}*000002000~`)


    return stLoop
}

module.exports = createStLoop