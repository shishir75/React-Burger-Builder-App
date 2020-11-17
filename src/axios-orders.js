import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-builder-a521c.firebaseio.com/",
});

export default instance;
