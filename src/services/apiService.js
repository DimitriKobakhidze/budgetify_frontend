import axios from "axios";
axios.defaults.withCredentials = true;

const apiBase = process.env.REACT_APP_API_BASE;

export const login = async (userData) => {
  console.log(userData);
  const res = await axios.post(`${apiBase}/login`, userData);

  return res.data;
};

export const verifyAuthToken = async () => {
  const res = await axios.get(`${apiBase}/check-token`);
  return res.data.userData;
};

export const getPaymentData = async (
  cardId,
  paymentType,
  sortByIncome,
  sortByDate,
  searchByTitle
) => {
  if (!cardId)
    throw new Error("Card is not selected or you don't have any cards");

  const res = await axios.get(
    `${apiBase}/payments/${cardId}/${paymentType}?sortByIncome=${
      sortByIncome || ""
    }&sortByDate=${sortByDate || ""}&searchByTitle=${searchByTitle || ""}`
  );
  return res.data;
};

export const addUserPayment = async (cardId, paymentType, paymentData) => {
  if (!cardId)
    throw new Error("Card is not selected or you don't have any cards");

  const res = await axios.post(
    `${apiBase}/payments/add/${cardId}/${paymentType}`,
    { paymentData }
  );
  return res.data;
};

export const deleteUserPayment = async (cardId, paymentType, paymentId) => {
  if (!cardId)
    throw new Error("Card is not selected or you don't have any cards");

  const res = await axios.delete(
    `${apiBase}/payments/delete/${cardId}/${paymentType}`,
    { data: { paymentId } }
  );
  return res.data;
};

export const editUserPayment = async (cardId, paymentType, paymentData) => {
  if (!cardId)
    throw new Error("Card is not selected or you don't have any cards");

  const res = await axios.post(
    `${apiBase}/payments/edit/${cardId}/${paymentType}`,
    { paymentData }
  );
  return res.data;
};

export const getUserCategories = async (sortByIncome, searchByCategoryName) => {
  const res = await axios.get(
    `${apiBase}/categories?sortByIncome=${
      sortByIncome || ""
    }&searchByCategoryName=${searchByCategoryName || ""}`
  );

  return res;
};

export const updateCategory = async (currentCategoryName, newCategoryName) => {
  if (!currentCategoryName || !newCategoryName)
    throw new Error("Category is not selected");

  const res = await axios.post(`${apiBase}/categories/edit`, {
    currentCategoryName,
    newCategoryName,
  });
  return res.data;
};

export const addCategory = async (categoryName, isIncome) => {
  const res = await axios.post(`${apiBase}/categories/add`, {
    categoryName,
    isIncome,
  });
  return res.data;
};

export const deleteCategory = async (categoryId) => {
  if (!categoryId) throw new Error("No categoryId provided");

  const res = await axios.delete(`${apiBase}/categories/delete`, {
    data: { categoryId },
  });
  return res.data;
};

export const getPiggyBanks = async (cardId) => {
  const res = await axios.get(`${apiBase}/piggybanks/${cardId}`);

  return res.data;
};

export const addPiggyBank = async (data) => {
  const res = await axios.post(`${apiBase}/piggybank/add`, {
    data,
  });

  return res.data;
};

export const updatePiggyBank = async (data) => {
  const res = await axios.post(`${apiBase}/piggybank/edit`, {
    data,
  });

  return res.data;
};

export const addToPiggyBank = async (data) => {
  console.log(data);
  const res = await axios.post(`${apiBase}/piggybank/add-money`, {
    data,
  });

  return res.data;
};

export const crashPiggyBank = async (cardId, piggyId) => {
  const res = await axios.post(`${apiBase}/piggybank/crash`, {
    data: { piggyId, cardId },
  });

  return res.data;
};

export const getCategoriesStatistics = async (date, cardId) => {
  const res = await axios.get(
    `${apiBase}/statistic/categories/${cardId}?startDate=${date.startDate.toISOString()}&endDate=${date.endDate.toISOString()}`
  );

  return res.data;
};

export const getMonthlyStatistics = async (date, cardId) => {
  const res = await axios.get(
    `${apiBase}/statistic/monthly/${cardId}?startDate=${date.startDate.toISOString()}&endDate=${date.endDate.toISOString()}`
  );

  return res.data;
};

export const getUserCards = async () => {
  const res = await axios.get(`${apiBase}/usercards`);

  return res.data;
};

export const editUserCard = async (data) => {
  const res = await axios.post(`${apiBase}/usercards/edit`, { data });

  return res.data;
};

export const addUserCard = async (data) => {
  const res = await axios.post(`${apiBase}/usercards/add`, { data });

  return res.data;
};

export const deleteUserCard = async (cardId) => {
  const res = await axios.post(`${apiBase}/usercards/delete`, { cardId });

  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get(`${apiBase}/logout`);

  return res.data;
};
