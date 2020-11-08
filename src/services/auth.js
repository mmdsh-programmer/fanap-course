import { auth, db } from "./firebase";

export function signin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signup(email, password, name) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      if (!!user) {
        await auth.currentUser.updateProfile({ displayName: name });
      }
      return user;
    });
}

export function getUserByUID(UID) {
  return db.database().ref(`Users/${UID}`).once('value');
}

export function signout() {
  return auth.signOut();
}