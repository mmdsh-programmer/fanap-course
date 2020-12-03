import axios from "axios"
class Entry {
    constructor() {
        this.service = axios.create({});
    }
    create() {

    }

    read() {
        return this.service.get("/api/entries")
    }

    update() {

    }

    delete() {

    }

}

const entries = new Entry();
export default entries;