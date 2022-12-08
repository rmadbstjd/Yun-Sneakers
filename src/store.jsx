import create from 'zustand';
import produce from "immer";
import {devtools}from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
const store = set =>({
    user :'',
    setUser : (user)=> set(state =>({user : user})),
    product : {
        url:'',
        title:'',
        price:'',
        category:'',
        description:'',
        size:''
    }
});
const useStore = create(devtools(store));

export default useStore;