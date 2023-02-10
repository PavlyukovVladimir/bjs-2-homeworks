function typeOf(obj) {
    return ({}).toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
}

function compareArrays(arr1, arr2) {
    if (typeOf(arr1) !== 'array') {
        return false;
    }
    if (typeOf(arr2) !== 'array') {
        return false;
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    if (arr1.length === 0) {
        return true;
    }

    return arr2.every((currentValue, index) => currentValue === arr1[index]);
}

function getUsersNamesInAgeRange(users, gender) {
    if (typeOf(users) !== 'array') {
        return 0;
    }
    return users
        .filter(user => user.gender === gender)
        .reduce(
            (previousValue, currentValue, currentIndex, array) => previousValue += currentValue.age / array.length,
            0
        );
}