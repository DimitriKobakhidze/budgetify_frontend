import { dateToCorrectStringFormat, nextPaymentDay } from "./utils";

// Mock the format function from date-fns to control its output

describe("dateToCorrectStringFormat", () => {
  test("should format a valid Date object when input is date object: new Date(year, month, 15)", () => {
    const date = new Date(2023, 4, 15);

    const result = dateToCorrectStringFormat(date);
    expect(result).toBe("05.15.2023");
  });
  test("should format a valid Date string when input is date object: new Date('2023-05-15T00:00:00.000Z')", () => {
    const date = new Date("2023-05-15T00:00:00.000Z");

    const result = dateToCorrectStringFormat(date);
    expect(result).toBe("05.15.2023");
  });
  test("should format a valid Date string when input is date object: new Date('2023-05-15')", () => {
    const date = new Date("2023-05-15");

    const result = dateToCorrectStringFormat(date);
    expect(result).toBe("05.15.2023");
  });
  test("date fns should throw error when date object is invalid like: new Date('2023-05-15xx')", () => {
    const date = new Date("2023-05-15xx");

    expect(() => dateToCorrectStringFormat(date)).toThrow("Invalid time value");
  });

  test("should return an error message for non string or object values for boolean", () => {
    expect(() => dateToCorrectStringFormat(true)).toThrow(
      "Function argument is not Date object or string"
    );
  });

  test("should return an error message for non string or object values for null", () => {
    expect(() => dateToCorrectStringFormat(null)).toThrow(
      "Function argument is not Date object or string"
    );
  });

  test("should return an error message for non string or object values for undefined", () => {
    expect(() => dateToCorrectStringFormat(undefined)).toThrow(
      "Function argument is not Date object or string"
    );
  });
});

describe("nextPaymentDay", () => {
  test("should format a valid Date string when input is correct Date object like: new Date(2023, 0, 28)", () => {
    const startDate = new Date(2023, 0, 28);

    const result = nextPaymentDay(startDate);
    expect(result).toBe("03.28.2024");
  });

  test("should format a valid Date string when input is correct Date object like: new Date('2024.02.28')", () => {
    const startDate = new Date("2024.02.28");

    const result = nextPaymentDay(startDate);
    expect(result).toBe("03.28.2024");
  });

  test("should return an error message for non string or non Date objects like null", () => {
    expect(() => nextPaymentDay(null)).toThrow(
      "Function argument is not Date object or string"
    );
  });

  test("should return an error message for non string or non Date objects like undefined", () => {
    expect(() => nextPaymentDay(undefined)).toThrow(
      "Function argument is not Date object or string"
    );
  });
});
