import { useFormattedDate } from "../componentes/Hooks/useFormattedDate";
import {useUsuariosStore} from "../Store/UsuariosStore";
import { usePostStore } from "../Store/PostStore"
import { toast } from "sonner";
import { useInfiniteQuery, useMutation, } from "@tanstack/react-query";
//mutacion parA REALIZAR PUBLICACIONES//
export const useInsetartPostMutate = () =>{
    const {insertarPost,file,setStateForm,setFile} = usePostStore();
    const fechaActual = useFormattedDate();
    const {dataUsuarioAuth} = useUsuariosStore();
    return useMutation({
        mutationKey : ["insertar post"],
        mutationFn: async(data) =>{
            let type = "imagen"
            if(file && file.name){
                const ext=file.name.split(".").pop()?.toLowerCase();
                if (ext==="mp4") type = "video";
            }
            const p={
                descripcion:data.descripcion,
                url:"-",
                fecha:fechaActual,
                id_usuario:dataUsuarioAuth?.id,
                type:type
            };
            await insertarPost(p,file)
        },
        onError:(error)=>{
            toast.error("error al insertar post" + error.message)
        },
        onSuccess:()=>{
            toast.success("publicado");
            setStateForm(false)
            setFile(null)
        }
    })
};
export const useLikePostMutate = () => { // nos permite mostrar el cambio en tiempo real de los likes
    const {likePost,itemSelect} = usePostStore(); //llamamos al zustand que muestra el cambio de los likes
    const {dataUsuarioAuth}=useUsuariosStore(); //llamamos la data del usuario
    return useMutation ({
        mutationKey:["like post"],
        mutationFn: ()=>likePost({p_post_id:itemSelect?.id,
            p_user_id:dataUsuarioAuth?.id}),
            onError:(error) => {
                toast.error("Error al dar like"+error.message)
            },
    })
}

// NOS PERMITIRA ORDENAR Y ENPAGINAR LAS PUBLICACIONES
export const useMostrarPostQuery = () => {
    const {dataUsuarioAuth} = useUsuariosStore ();
    const{mostrarPost} = usePostStore();
    const cantidad_pagina = 10
    return useInfiniteQuery ({
        queryKey:["mostrar post",{id_usuario:dataUsuarioAuth?.id}],
        queryFn: async({pageParam = 0}) =>{
            const data = await mostrarPost({id_usuario:dataUsuarioAuth?.id,desde:pageParam, hasta:cantidad_pagina});
            return data;
        },
        getNextPageParam:(lastpage, allpages) => {
            if(!lastpage || lastpage.length <cantidad_pagina) return undefined;
                return allpages.length * cantidad_pagina;
        },
        initialPageParam: 0,
    });
};