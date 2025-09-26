import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../Store/AuthStore"
import { toast } from "sonner"


export const useCrearUsuarioYSesionMutate = () => {
    const {crearUserYLogin,credenciales} = useAuthStore()
    return useMutation ({
        mutationKey :["iniciar con email testes"],
        mutationFn : async()=>{
            await crearUserYLogin({
                email: credenciales.email,
                password: credenciales.password,
            })
        },
        onError:(error)=> {
            toast.error(`Error: ${error.message}`);
        },
        onSuccess:()=>{
            toast.success("ok, todo salio bien");
        }
    });
}
