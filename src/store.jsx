import create from 'zustand';
import produce from "immer";
import {devtools}from 'zustand/middleware';

const store = set =>({
    user :'',
    setUser : (user)=> set(state =>({user : user})),
});
const useStore = create(devtools(store));

export default useStore;