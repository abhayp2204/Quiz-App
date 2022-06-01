export function isValidFileType(fileType, validFileTypes) {
    return validFileTypes.includes(fileType)
}

export function timeFormat(s) {
    let minutes = Math.floor(s / 60)
    let seconds = s % 60
    let isOneDigit = !Math.floor(seconds / 10)
    let str = isOneDigit? "0" : ""
    
    return String(minutes) + ":" + str + String(seconds)
}

export function random(n) {
    return Math.floor(Math.random() * 10) % n
}