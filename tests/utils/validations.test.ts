import { isValidEmail } from "../../utils/validations";

describe("isValidEmail", () => {
  test("should return true for valid email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
  });

  test("should return false for invalid email addresses", () => {
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});
