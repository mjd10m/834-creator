const {addSpace, formatDate} = require('./helpers')

const createHeader = (data) => {
    const timestamp = Date.now()
const fileHeader = 
`ISA*00*          *00*          *ZZ*${addSpace(data.senderId,15)}*30*${addSpace(data.state,15)}*${formatDate('YYMMDD',timestamp)}*${formatDate('HHmm',timestamp)}*^*00501*000000100*1*T*:~
GS*BE*${data.senderId}*TX*${formatDate('YYYYMMDD',timestamp)}*${formatDate('HHmmssSS',timestamp)}*1000*X*005010X220A1~`

return fileHeader
}

module.exports = createHeader