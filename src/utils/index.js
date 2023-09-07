export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const generateRandomId = () => {
  return Math.floor(Math.random() * 9000000000 + 1000000000); 
};

export const isUserDataAvailable = () => {
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  return currUser && Object.keys(currUser).length > 0;
};

export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
