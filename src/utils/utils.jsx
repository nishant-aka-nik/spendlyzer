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

