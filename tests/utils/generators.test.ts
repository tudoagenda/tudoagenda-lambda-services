import { generatePassword } from "../../utils/generators";

describe("generatePassword", () => {
  test("should generate password with correct length", () => {
    const password = generatePassword();
    expect(password.length).toBe(12);
  });

  test("should contain at least one uppercase letter", () => {
    const password = generatePassword();
    expect(password).toMatch(/[A-Z]/);
  });

  test("should contain at least one lowercase letter", () => {
    const password = generatePassword();
    expect(password).toMatch(/[a-z]/);
  });

  test("should contain at least one number", () => {
    const password = generatePassword();
    expect(password).toMatch(/[0-9]/);
  });

  test("should contain at least one special character", () => {
    const password = generatePassword();
    expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
  });
});
