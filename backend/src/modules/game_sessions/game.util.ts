const getWeekStart = (date: Date): string => {
  const istDate = new Date(
    date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );

  const day = istDate.getDay(); // 0 = Sunday, 1 = Monday, ...
  const daysFromMonday = day === 0 ? 6 : day - 1;

  istDate.setDate(istDate.getDate() - daysFromMonday);

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const dateValue = String(istDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${dateValue}`;
};

export default getWeekStart;