import { v4 as uuidv4 } from "uuid";

const GUEST_KEY = "guestId";

export const createGuestIdInLocalStorage = () => {
  let guestId = localStorage.getItem(GUEST_KEY);

  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem(GUEST_KEY, guestId);
  }

  return guestId;
};

export const clearGuestIdFromLocalStorage = () => {
  return localStorage.removeItem(GUEST_KEY);
};
