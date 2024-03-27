const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];


const toMonthlyBookDataList = (readingLogs) => {
    const response = []

    const includedMonths = Object.keys(readingLogs);
    
    for(let month of months) {
        let category = month.substring(0,3);
        if (includedMonths.includes(month)){
            let value = readingLogs[month]
            response.push({month : category, count : value})
        } else {
            response.push({month : category, count : 0})
        }

    }

    console.log(response)

    return response
}

export default toMonthlyBookDataList