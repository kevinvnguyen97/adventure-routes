import { passwordRequirementsRegex } from "@constants/password";

export const checkIsPasswordRequirementsMet = (password: string) => {
  return passwordRequirementsRegex.test(password);
};
