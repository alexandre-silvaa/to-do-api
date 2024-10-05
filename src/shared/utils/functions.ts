export const addThreeHours = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 3);
  return newDate;
};

export const subtractThreeHours = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 3);
  return newDate;
};
