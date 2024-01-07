import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = (type, pos, msg) => {
  if (type === "success") {
    toast.success(msg, {
      position: pos,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (type === "error") {
    toast.error(msg, {
      position: pos,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export default Toastify;
