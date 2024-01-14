exports.sortObject = (obj) => {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

exports.isDayEqual = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        return false; // Hoặc thực hiện xử lý khác tùy thuộc vào yêu cầu của bạn
    }

    const day1 = date1.getUTCDate();
    const month1 = date1.getUTCMonth();
    const year1 = date1.getUTCFullYear();

    const day2 = date2.getUTCDate();
    const month2 = date2.getUTCMonth();
    const year2 = date2.getUTCFullYear();

    return day1 === day2 && month1 === month2 && year1 === year2;
}


exports.getDate = (startDay, endDay) => {
	const result = [];
	let currentDay = new Date(startDay);
  
	while (currentDay <= endDay) {
	  result.push(new Date(currentDay));
	  currentDay.setDate(currentDay.getDate() + 1);
	}
  
	return result;
}

exports.getWeeksInMonth = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getUTCDay();

    const daysInMonth = lastDayOfMonth.getUTCDate();
    const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
	
    return weeks;
}

exports.getStartOfWeek = (year, month, week) => {
	const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const daysUntilFirstSunday = (7 - firstDayOfMonth.getUTCDay()) % 7;

    const startOfWeek = new Date(firstDayOfMonth);
    startOfWeek.setUTCDate(firstDayOfMonth.getUTCDate() + daysUntilFirstSunday + (week - 1) * 7);

    return startOfWeek;
}

exports.getMonth = (year, monthIndex) => {
	const firstDay = new Date(year, monthIndex, 1);
	const lastDay = new Date(year, monthIndex + 1, 0);
  
	return {
	  start: firstDay,
	  end: lastDay
	};
}