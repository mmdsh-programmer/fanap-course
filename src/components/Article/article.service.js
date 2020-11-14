import * as firebase from "services";

export const db = firebase.db.ref("/articles");
export const dbImage = firebase.db.ref("/images")

class ArticleService {

  getAll() {
    return db
  }

  create(article) {
    return db.push(article);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).delete();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ArticleService();
