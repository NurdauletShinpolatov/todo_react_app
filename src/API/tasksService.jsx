import axios from "axios";

const BASE_URL = "https://646612859c09d77a62fc19ff.mockapi.io/app/todos";

const instance = axios.create({
    baseURL: BASE_URL,
})

export const tasksService = {
    get: () => {
        console.log("get");
        return instance.get();
    },
    delete: (id) => {
        console.log("delete");
        return instance.delete("/"+id);
    },
    create: (body) => {
        console.log("post");
        return instance.post("", body);
    },
    update: (id, body) => {
        console.log("update");
        return instance.put("/"+id, body).then(res => {console.log(res);});
    }
}