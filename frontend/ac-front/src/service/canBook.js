import { toast } from "react-toastify";

export const canBookService = (user, navigate, targetUrl) => {

  if (!user) {
    toast("Please login first to book a service");
    return;
  }

  navigate(targetUrl);
};
