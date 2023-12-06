export function getMonthName(index) {
    // Get the current date
    const today = new Date();

    // Calculate the next month and year
    const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

    // Check for year rollover
    if (month.getMonth() === 0) {
        month.setFullYear(today.getFullYear() + 1);
    }

    // Get the name of the next month using toLocaleString
    const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' });

    return monthName;
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

export function getGreetingByTimezone() {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    const hour = new Date(now).getHours();

    if (hour >= 5 && hour < 12) {
        return "Good morning! ☀️";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon! 🌤️";
    } else {
        return "Good evening! 🌙";
    }
}