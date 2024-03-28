import { addMonths, parseISO } from "date-fns";

export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const numberRegExp = /^[0-9]+$/;

const isDateValidType = (date) => {
  return date instanceof Date || typeof date === "string";
};

export const currencyOptions = [
  {
    label: "US Dollar [$]",
    value: { name: "US Dollar", symbol: "$" },
  },
  {
    label: "Pound [£]",
    value: { name: "Pound", symbol: "£" },
  },
  {
    label: "Yen [¥]",
    value: { name: "Yen", symbol: "¥" },
  },
];

// date variable can be object of Date or string
export const dateToCorrectStringFormat = (date) => {
  if (!isDateValidType(date))
    throw new Error("Function argument is not Date object or string");

  if (date instanceof Date) {
    return new Intl.DateTimeFormat().format(date);
  } else if (typeof date === "string") {
    const convertedString = new Intl.DateTimeFormat().format(parseISO(date));
    return convertedString;
  }
};

export const nextPaymentDay = (startDate) => {
  if (!isDateValidType(startDate))
    throw new Error("Function argument is not Date object or string");

  if (typeof startDate === "string") {
    try {
      startDate = new Date(startDate);
    } catch (e) {
      throw new Error("Recieved string argument is invalid");
    }
  }

  const currentDate = new Date();

  let nextPaymentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    startDate.getDate()
  );

  if (currentDate.getDate() > startDate.getDate())
    nextPaymentDate = addMonths(nextPaymentDate, 1);

  return dateToCorrectStringFormat(nextPaymentDate);
};

export const userCategoriesToSelectOptions = (categoriesArray) => {
  return categoriesArray.map((categoryName) => ({
    value: categoryName,
    label: categoryName,
  }));
};

export const vaildateIncome = (isIncome) => typeof isIncome === "boolean";
export const vaildateNumberInput = (inputValue) =>
  inputValue.match(numberRegExp);
export const validateCategoriesInput = (inputValue) =>
  Array.isArray(inputValue) && inputValue.length > 0;
export const valdateInputNotEmpty = (inputValue) => inputValue !== "";

export const validatePaymentForm = (paymentForm, paymentType) => {
  const errorsCollector = [];

  if (!valdateInputNotEmpty(paymentForm.title))
    errorsCollector.push("Title field is empty");
  if (!valdateInputNotEmpty(paymentForm.description))
    errorsCollector.push("Description field is empty");
  if (!vaildateNumberInput(paymentForm.amount))
    errorsCollector.push("Amount field is empty or not number");

  if (paymentType === "Subscriptions" || paymentType === "Transactions") {
    if (!validateCategoriesInput(paymentForm.categories))
      errorsCollector.push("Select atleast 1 category");

    if (paymentType === "Transactions") {
      if (!vaildateIncome(paymentForm.isIncome))
        errorsCollector.push("Invalid income value");
      if (!valdateInputNotEmpty(paymentForm.payee))
        errorsCollector.push("Payee field is empty");
      if (!valdateInputNotEmpty(paymentForm.date))
        errorsCollector.push("Date field is empty");
    }
  }

  if (paymentType === "Subscriptions" || paymentType === "Obligatories") {
    if (!valdateInputNotEmpty(paymentForm.date.from))
      errorsCollector.push("Select start date");
    if (!valdateInputNotEmpty(paymentForm.date.to))
      errorsCollector.push("Select end date");
  }

  return errorsCollector;
};

export const chartRandomRgbColor = () => {
  const color1 = { r: 150, g: 219, b: 198 };
  const color2 = { r: 243, g: 209, b: 216 };

  const r = Math.floor(Math.random() * (color2.r - color1.r + 1)) + color1.r;
  const g = Math.floor(Math.random() * (color2.g - color1.g + 1)) + color1.g;
  const b = Math.floor(Math.random() * (color2.b - color1.b + 1)) + color1.b;

  return `rgb(${r}, ${g}, ${b})`;
};

export const calculatePercentage = (partValue, totalValue) => {
  return (partValue * 100) / totalValue;
};
