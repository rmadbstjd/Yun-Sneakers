import create from 'zustand';
import produce from "immer";
import {devtools, persist}from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
const store = persist(set =>({
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
    setLast : (boolean) => set(state =>({last : boolean})),
    willAddProduct : {
        id:'',
        url:'',
        title:'',
        price:'',
        category:'',
        description:'',
        size:''
    },
    setWillAddProduct : (product) => set(produce((draft) => {draft.willAddProduct={id:product.id,url:product.url,title:product.title,price:product.price,category:product.category,description:product.description,size:product.size}})),
    totalCount : 0,
    initTotalCount : (init) => set(state =>({totalCount : init })),
    plusTotalCount : () => set(state =>({totalCount : state.totalCount + 1})),
    minusTotalCount : () => set(state =>({totalCount : state.totalCount - 1})),
    deleteTotalCount : (count) => set(state =>({totalCount : state.totalCount - count})),
    totalPrice : 0,
    initTotalPrice : (init) => set(state =>({totalPrice : init })),
    plusTotalPrice : (price) => set(state => ({totalPrice : state.totalPrice + price})),
    minusTotalPrice : (price) => set(state => ({totalPrice : state.totalPrice - price})),
}),{ name: "user-StoreName" }   );
const useStore = create(devtools(store));

export default useStore;