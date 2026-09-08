import type {
  ServerResponse,
  SignInResponse,
  SignInArgs,
  SignUpArgs,
  GetProfileResponse,
} from "../types/api";
import type { AxiosInstance } from "axios";

const createUsersApi = (axiosInstance: AxiosInstance) => {
  return {
    signIn: async (args: SignInArgs) =>
      await axiosInstance.post<SignInResponse>("/users/sign-in", args),
    signUp: async (args: SignUpArgs) =>
      await axiosInstance.post<ServerResponse>("/users/sign-up", args),
    signOut: async () =>
      await axiosInstance.post<ServerResponse>("/users/sign-out"),
    getProfile: async () =>
      await axiosInstance.get<GetProfileResponse>("/users/profile"),
    getAllUsers: async () => await axiosInstance.get("/users"),
  };
};

export default createUsersApi;
