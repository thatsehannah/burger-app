import axios from "axios";

const orderInstance = axios.create({
  baseURL: "https://react-my-burger-1a418.firebaseio.com/",
});

export default orderInstance;
