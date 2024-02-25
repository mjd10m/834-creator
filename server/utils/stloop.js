const {formatDate, dtpDates, subDemo, formatInput} = require('./helpers');
const createLsLoop = require('./lsloop.js')

const createStLoop = (data) => {
    const timestamp = Date.now()
    const stLoop =
`ST*834*000002000*005010X220A1~
BGN*00*${data.exchId}*${formatDate('YYYYMMDD',timestamp)}*${formatDate('HHmmssSS',timestamp)}*ET***2~
DTP*007*D8*${formatDate('YYYYMMDD',timestamp)}~
QTY*ET*1~
QTY*DT*${data.depNum}~
QTY*TO*${(Number(data.depNum) + 1)}~
N1*P5*${data.subName}*FI*${data.ssn}~
N1*IN*${data.payerName}*FI*${data.payerId}~
N1*BO*${data.brokerName}*FI*${data.brokerId}~
INS*Y*18*021*EC*A*E**AC~
REF*0F*${data.exchId}~
REF*17*${data.exchId}~
REF*23*${data.carrId}~
REF*ZZ*${data.carrId}~
${dtpDates(data.eligbDate,data.eligbTermDate,356)}
${subDemo(data)}
DMG*D8*${formatDate('YYYYMMDD',data.dob)}*${formatInput(data.gen)}**:RET:2106-3~
HLH*${formatInput(data.smoke)}~
LUI*LE*ENG**7~
LUI*LE*ENG**6~
NM1*31*1~
N3*${data.strAddr}~
N4*${data.city}*${data.state}*${data.zCode}~
HD*021**${formatInput(data.covType)}~
${dtpDates(data.transDate,data.transTermDate,348)}
REF*1L*${data.policyNum}~
REF*CE*${data.hiosId}~
REF*X9*${data.policyNum}~
LS*2700~
${createLsLoop(data, timestamp)}`


    return stLoop
}

module.exports = createStLoop