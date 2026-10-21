const getSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// "21st November 2026"
export const formatDateWithSuffix = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  return `${day}${getSuffix(day)} ${month} ${date.getFullYear()}`;
};

// "21ST November"
export const formatEventDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  return `${day}${getSuffix(day).toUpperCase()} ${month}`;
};
