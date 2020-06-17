const BigNumber = require('bignumber.js');

var chopDown = function(beacon, min, max) {
    console.log("beacon : " + beacon);
    min = new BigNumber(min)
    max = new BigNumber(max)
    beacon = new BigNumber(beacon)
    console.log(beacon);
    intervalSize = new BigNumber(max - min + 1)
    var refinedNumber = refine(beacon, intervalSize)
    var result = []
    console.log(refinedNumber.toString(10))
    while (refinedNumber > 0) {
        temp = extract(refinedNumber, intervalSize)
        refinedNumber = temp[1]
        console.log(refinedNumber.toString(10))
        result.push(temp[0].plus(min).toString(10))
    }
    console.log(result);
    return result;
}

function refine(originalNumber, intervalSize) {
    console.log(originalNumber.toString(10))

    var bestLog = Math.floor((Math.log(2) * 256.0 - Math.log(Math.log(intervalSize) + 1)) / Math.log(intervalSize))

    var remainder = new BigNumber(2).pow(256).mod(intervalSize.pow(bestLog))

    while (originalNumber.lt(remainder)) {
        console.log(remainder.toString(10))
        bestLog = bestLog - 1
        if (bestLog == 0) return undefined
        remainder = new BigNumber(2).pow(256).mod(intervalSize.pow(bestLog))
    }
    console.log(bestLog)
    return originalNumber.mod(intervalSize.pow(bestLog))

}

function extract(sourceNumber, modulo) {
    return [sourceNumber.mod(modulo), sourceNumber.divToInt(modulo)]
}

chopDown("0x1f632824e5cdafb6769da8d2b97f91c4d4459591a3ac9ba2ac8a9e2877d7c7da", 1, 24);