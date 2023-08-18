/**
 * 
 * @param {number[]} arr
 * @returns lowest number inside an array of numbers
 */
function lowestNumber(arr) {
    return arr.reduce((a, b) => a < b ? a : b, arr[0])
}

export { lowestNumber }