export function getNextMonthName() {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Get the name of the next month using toLocaleString
    const nextMonthName = nextMonth.toLocaleString('default', { month: 'long' });

    return nextMonthName;
}

export function getNextToNextMonthName() {
    const today = new Date();
    const nextToNextMonth = new Date(today);
    nextToNextMonth.setMonth(nextToNextMonth.getMonth() + 2);

    // Get the name of the next to next month using toLocaleString
    const nextToNextMonthName = nextToNextMonth.toLocaleString('default', { month: 'long' });

    return nextToNextMonthName;
}

export function bgRandomizer() {
    const randomInteger = getRandomInt(1, 5);
    return `/static/images/cards/cardheader${randomInteger}.jpg`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }