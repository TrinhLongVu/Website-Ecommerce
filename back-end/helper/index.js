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

exports.getMonth = (year, monthIndex) => {
	const firstDay = new Date(year, monthIndex, 1);
	const lastDay = new Date(year, monthIndex + 1, 0);
  
	return {
	  start: firstDay,
	  end: lastDay
	};
}