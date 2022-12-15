import create from 'zustand';
import produce from "immer";
import {devtools}from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
const store = set =>({
    user :'',
    setUser : (user)=> set(state =>({user : user})),
    newProduct : {
        url:'',
        title:'',
        price:'',
        category:'',
        description:'',
        size:''
    },
    setNewProduct : (col,row)=> set(produce((draft) => {draft.newProduct[col] = row})),
    setInitNewProduct : () => set(produce((draft) => {draft.newProduct ={url:'',title:'',price:'',category:'',description:'',size:''}})),
    currentProduct : {
        url:'',
        title:'',
        price:'',
        category:'',
        description:'',
        size:''
    },
    setCurrentProduct : (product) => set(produce((draft) => {draft.currentProduct={url:product.image,title:product.title,price:product.price,category:product.category,description:product.description,size:product.size}})),
    size :'',
    setSize : (size) =>set(state =>({size : size})),
    setInitSize : () =>set(state=>({size: ''})),
    last :false,
    setLast : (boolean) => set(state =>({last : boolean}))
});
const useStore = create(devtools(store));

export default useStore;