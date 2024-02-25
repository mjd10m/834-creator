const {formatDate, dtpDates, subDemo, formatInput} = require('./helpers')

const createLsLoop = (data, timestamp) => {
    const loopData = {
        name:['RATING'],
        variable:[data.rateArea],
        transDate: data.TransDate
    }
    const lsLoop = 
`LX*1~
N1*75*RATING AREA~
REF*9X*${data.rateArea}~
${dtpDates(data.transDate,'','007')}`

    return lsLoop

}

module.exports = createLsLoop