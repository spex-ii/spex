/**
 * 
 * @param {number[]} arr
 * @returns highest number inside an array of numbers
 */
function highestNumber(arr) {
    return arr.reduce((a, b) => a > b ? a : b, arr[0])
}

export { highestNumber }