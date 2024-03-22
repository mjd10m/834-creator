const {formatDate, dtpDates, subDemo, formatInput, formatName} = require('./helpers');
const createLsLoop = require('./lsloop.js')

const createInsLoop = (genData, memData, timestamp, subData) => {
    const subInd = memData.relationCode === undefined ? 'Y' : 'N'
    const insLoop = 
`INS*${subInd}*${subInd === 'Y' ? '18' : formatInput(memData.relationCode)}*021*EC*A*E**AC~
REF*0F*${subInd === 'Y' ? memData.exchId : subData.exchId}~
REF*17*${memData.exchId}~
REF*23*${memData.carrId}~
REF*ZZ*${subInd === 'Y' ? memData.carrId : subData.carrId}~
${dtpDates(genData.eligbDate,genData.eligbTermDate,356)}
${subDemo(genData, memData, subInd, subData)}
DMG*D8*${formatDate('YYYYMMDD',memData.dob)}*${formatInput(memData.gen)}**:RET:2106-3~
HLH*${formatInput(memData.smoke)}~
LUI*LE*ENG**7~
LUI*LE*ENG**6~ ${subInd === 'Y' ? `\nNM1*31*1~\nN3*${memData.strAddr}~\nN4*${memData.city}*${genData.state}*${memData.zCode}~`: ''}
HD*021**${formatInput(memData.covType)}~
${dtpDates(genData.transDate,genData.transTermDate,348)}
REF*1L*${genData.policyNum}~
REF*CE*${genData.hiosId}~
REF*X9*${genData.policyNum}~
LS*2700~
${createLsLoop(genData, memData, timestamp, subInd)}
LE*2700~`

    return insLoop
}

module.exports = createInsLoop