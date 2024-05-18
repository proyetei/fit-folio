export function prettyDate(date: string): string {
    interface MonthNames {
      [key: string]: string;
  }
  const monthNames: MonthNames = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };
  
    const [year, month, day] = date.split("T")[0].split("-");
    const monthName = monthNames[month] || "";
    return `${monthName} ${day}, ${year}`;
  }