
export const formatDate = (date: Date | string | number | undefined): string => {
  if (!date) return "";

  const d = new Date(date);
  
  if (isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
};