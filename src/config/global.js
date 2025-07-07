import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

window.toastify = (msg, type) => {
    switch (type) {
        case "success":
            toast.success(msg);
            break;
        case "info":
            toast.info(msg);
            break;
        case "error":
            toast.error(msg);
            break;
        case "warning":
            toast.warn(msg);
            break;
        default:
            toast(msg); // Default toast
            break;
    }
};
