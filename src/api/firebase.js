import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import { getDatabase, ref, set, get } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("유저", user);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("img", user.photoURL);

      return user;
    })
    .catch((error) => {
      console.log("에러", error);
      // ...
    });
}
export function logout() {
  signOut(auth).catch((error) => {
    console.log(error);
  });
}
export async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();

      const isAdmin = admins.includes(user);

      return isAdmin;
    } else {
    }
  });
}
/*export async function addProduct(
  title,
  price,
  description,
  category,
  size,
  url
) {
  const id = uuid();
  set(ref(database, `products/${id}`), {
    id: id,
    price: parseInt(price),
    image: url,
    description: description,
    category: category,
    size: size.split(","),
  });
}*/
export async function addProduct(product, image) {
  const id = uuid();
  console.log("product", product);
  set(ref(database, `products/${id}`), {
    id: id,
    price: parseInt(product.price),
    image: image,
    description: product.description,
    category: product.category,
    size: product.size.split(","),
  });
}
