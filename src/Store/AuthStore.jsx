import { create } from "zustand";
import {supabase} from "../supabase/supabase.config"
//funcion para autenticacion de email  y contraseña
export const useAuthStore = create((set)=>({
    credenciales:null,
    setCredenciales:(p)=>set({credenciales:p}),
    crearUserYLogin : async (p)=> {
        const {data} = await supabase.auth.signUp({
            email:p.email,
            password:p.password,
        })
        return data.user;
    },
    CerrarSesion: async() => {
        await supabase.auth.signOut();
    },
}));

// estop nos permite para indicar cuando el usuario aun esta logueado a la pagina

export const useSubcription = create ((set)=>{
    // inicia el estado
    const store = {
        user:null,
        setUser:(user)=> set({user}),
    };
    //inicia el oyente
    supabase.auth.getSession().then(({data:{session}})=>{
        if(session?.user){
            set({user:session.user});
            console.log("user",session.user)
        }
    });
    supabase.auth.onAuthStateChange((_event,session)=>{
        if(session?.user){
            set ({user:session.user})
            console.log("user",session.user)
        }else {
            set({user:null});
        }
    });
    return store;
})