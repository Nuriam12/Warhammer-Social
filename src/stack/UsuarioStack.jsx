import { useQuery } from "@tanstack/react-query";
import { useSubcription } from "../Store/AuthStore";
import { useUsuariosStore } from "../Store/UsuariosStore"

export const useMostrarUsuarioAuthQuery =()=>{
    const {mostrarUsuarioAuth} = useUsuariosStore();
    const {user} = useSubcription();
    return useQuery({
        queryKey:["mostrar user auth"],
        queryFn:()=>mostrarUsuarioAuth({id_auth:user?.id})
    })
}