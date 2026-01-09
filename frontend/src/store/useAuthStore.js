import {create} from 'zustand';
export const useStore = create((set) => ({
    authUser: {name: "bengo", _id : "1234", age: 30 },
    isLoading  : false, 

    login: () => {
        console.log("login called");
        set({isLoggedIn: true});
    },
    
    
}));