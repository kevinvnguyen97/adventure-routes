import { passwordRequirementsRegex } from "@constants/password";
import { passwordStrength, defaultOptions } from "check-password-strength";

export const checkIsPasswordRequirementsMet = (password: string) => {
  return passwordRequirementsRegex.test(password);
};

export const getPasswordStrength = (password: string) => {
  return passwordStrength(password, [
    ...defaultOptions,
    { id: 4, value: "Very strong", minDiversity: 4, minLength: 14 },
  ]).id;
};
