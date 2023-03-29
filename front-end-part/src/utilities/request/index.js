import axios from "axios";
import { toast } from "./../";

const request = ({
  callback = () => {},
  error_callback = () => {},
  method,
  url,
  title,
  withNotification = false,
  data,
}) => {
  axios({ url, data, method })
    .then((response) => {
      callback(response);
      withNotification === true &&
        toast({ message: title + " with success", type: "success" });
    })
    .catch((error) => {
      toast({
        message: "Error in " + title + "\n\n" + error.message,
        type: "error",
      });
      console.error(error);
      console.log(url);
      error_callback(error);
    });
};

export default request;
