const generateRandomPair = (fisrtLowBound, firstUpBound, secondLowBound, secondUpBound) => {
    const firstInt = Math.floor(Math.random() * (firstUpBound - fisrtLowBound + 1)) + fisrtLowBound;
    const secondInt = Math.floor(Math.random() * (secondUpBound - secondLowBound + 1)) + secondLowBound;
    return [firstInt, secondInt];
}

const generateUniquePairs = (amount, restrictionSet, fisrtLowBound, firstUpBound, secondLowBound, secondUpBound) => {
    const result = [];
    const usedPairs = new Set();

    while (result.length < amount) {
        const pair = generateRandomPair(fisrtLowBound, firstUpBound, secondLowBound, secondUpBound);

        const pairString = pair.join(', ');
        if (!usedPairs.has(pairString) && !restrictionSet.has(pairString)) {
            result.push(pair);
            usedPairs.add(pairString);
        }
    }

    return result;
}

const validateMaze = (maze) => {
    // Returns true if given maze is solvable
    // TODO 
}

exports.generateRandomPair = generateRandomPair;
exports.generateUniquePairs = generateUniquePairs;
exports.validateMaze = validateMaze;