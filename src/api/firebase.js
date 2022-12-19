import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import { getDatabase, ref, set, get, remove } from "firebase/database";

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

  set(ref(database, `products/${id}`), {
    id: id,
    title: product.title,
    price: parseInt(product.price),
    image: image,
    description: product.description,
    category: product.category,
    size: product.size.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  });
}
export async function getSimilarProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      let test = snapshot.val();

      return Object.values(snapshot.val());
    } else {
      return [];
    }
  });
}
export async function getProductInfo(id) {
  return get(ref(database, `products/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val() || {};

      return Object.values(items);
    } else {
      return [];
    }
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
