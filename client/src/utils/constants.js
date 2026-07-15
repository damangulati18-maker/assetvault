const BASE_URL = import.meta.env.VITE_API_URL;

export const signupurl = `${BASE_URL}/signupNewUser`;
export const loginurl = `${BASE_URL}/loginUser`;
export const getitemsurl = `${BASE_URL}/getItems`;
export const additemurl = `${BASE_URL}/addNewItem`;
export const assignitemurl = `${BASE_URL}/assignItem`;
export const getassignitemsurl = `${BASE_URL}/getAssignedItems`;
export const additemforrepairurl = `${BASE_URL}/addItemForMaintainance`;
export const getrepairitemsurl = `${BASE_URL}/getItemsForRepairs`;
export const logouturl = `${BASE_URL}/logout`;