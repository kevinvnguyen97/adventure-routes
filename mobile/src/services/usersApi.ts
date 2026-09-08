import {
  ServerResponse,
  SignInResponse,
  SignInArgs,
  SignUpArgs,
} from "@shared/types/api";
import axiosInstance from "./axiosInstance";

const usersApi = {
  signIn: async (args: SignInArgs) =>
    await axiosInstance.post<SignInResponse>("/users/sign-in", args),
  signUp: async (args: SignUpArgs) =>
    await axiosInstance.post<ServerResponse>("/users/sign-up", args),
  signOut: async () =>
    await axiosInstance.post<ServerResponse>("/users/sign-out"),
  getProfile: async () => await axiosInstance.get("/users/profile"),
  getAllUsers: async () => await axiosInstance.get("/users"),
};

export default usersApi;
