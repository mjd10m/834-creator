const moment = require('moment')

const addSpace = (text,length) => {
    spaces = length - text.length
    let outputText = text + ' '.repeat(spaces)
    return outputText
};

const formatDate = (format,timestamp) => {
return moment(timestamp).format(format)
}

const dtpDates = (date,termDate, num) => {
    let outputText = ''
    if (termDate === undefined || termDate === '') {
        outputText = 
`DTP*${num}*D8*${formatDate('YYYYMMDD',date)}~`
    } else {
        outputText =
`DTP*${num}*D8*${formatDate('YYYYMMDD',date)}~
DTP*${num + 1}*D8*${formatDate('YYYYMMDD',termDate)}~`
    }
    return outputText
}

const createNameArr = (name) => {
    let nameArr = name.split(' ')
    if (nameArr.length = 2) {
        nameArr.splice(1,0,'')
    }
    return nameArr
}

const formatName = (name) => {
    const nameArr = name.split(' ')
    if(nameArr.length < 3 ) {
        return `${nameArr[1]} ${nameArr[0]}`
    } else {
        return `${nameArr[2]} ${nameArr[0]} ${nameArr[1]}`
    }
}
const subTypeInfo = (subType, cCode) => {
    let stInfo = []
    switch (subType) {
        case "Subscriber":
            stInfo = ['IL','IP',`**CY*${cCode}`]
            break
        case "Responsible Party":
            stInfo = ['QD','RP','']
            break
        case "Custodial Parent":
            outputText =
            stInfo = ['S3','PQ','']
            break
    }
    return stInfo
}

const subDemo = (genData, subData) => {
    let outputText = ''
    let nameArr = createNameArr(subData.subName)
    let subTypeArr = subTypeInfo(subData.subType,subData.cCode)
    outputText =
`NM1*${subTypeArr[0]}*1*${nameArr[2]}*${nameArr[0]}*${nameArr[1]}***34*${subData.ssn}~
PER*${subTypeArr[1]}**TE*5555555555*EM*${nameArr[0]}.${nameArr[2]}@test.com~
N3*${subData.strAddr}~
N4*${subData.city}*${genData.state}*${subData.zCode}${subTypeArr[2]}~`
    
    return outputText
}

const formatInput = (inputText) => {
    let textArr = inputText.split(' ')
    return textArr[0]
}

const createFileName = () => {
    const timestamp = moment()
    return `834_TX_CHRCONVONHIX_I_${formatDate('YYYYMMDDHHMMSSDD',timestamp)}`
}

module.exports = {addSpace, formatDate, dtpDates, subDemo, formatInput, createFileName, formatName}