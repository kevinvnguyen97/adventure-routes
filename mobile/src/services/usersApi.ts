import axiosInstance from "./axiosInstance";

const usersApi = {
  signIn: async (args: { usernameOrEmail: string; password: string }) =>
    await axiosInstance.post("/users/sign-in", args),
  signUp: async (args: {
    email: string;
    username: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => await axiosInstance.post("/users/sign-up", { args }),
  signOut: async () => await axiosInstance.post("/users/sign-out"),
  getProfile: async () => await axiosInstance.get("/users/profile"),
  getAllUsers: async () => await axiosInstance.get("/users"),
};

export default usersApi;
