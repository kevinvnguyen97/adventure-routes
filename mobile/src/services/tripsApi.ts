import axiosInstance from "./axiosInstance";

const tripsApi = {
  getLoggedInUserTrips: async () => await axiosInstance.get("/trips"),
};

export default tripsApi;
