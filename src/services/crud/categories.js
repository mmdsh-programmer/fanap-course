import axios from "axios"
class Category {
    constructor() {
        this.service = axios.create({});
    }
    create() {

    }

    read() {
        return this.service.get("/api/categories")
    }

    update() {

    }

    delete() {

    }

}

const category = new Category();
export default category;