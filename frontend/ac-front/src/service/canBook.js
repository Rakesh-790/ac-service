import { toast } from "react-toastify";

export const canBookService = (navigate, targetUrl) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast("Please login first to book a service");
    console.log("BOOKING TOKEN:", localStorage.getItem("accessToken"));

    return;
  }

  navigate(targetUrl);
};
