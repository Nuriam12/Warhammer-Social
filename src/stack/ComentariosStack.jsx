import { useMutation } from "@tanstack/react-query"
import { use } from "react";
import { useComentariosStore } from "../Store/ComentariosStore";
import { useUsuariosStore } from "../Store/UsuariosStore";
import { usePostStore } from "../Store/PostStore";
import { useFormattedDate } from "../componentes/Hooks/useFormattedDate";
import { toast } from "sonner";

export const useInsertarComentarioMutate = (p) => {
    const {insertarComentario} = useComentariosStore();
    const {dataUsuarioAuth} = useUsuariosStore();
    const {itemSelect} = usePostStore();
    const fechaActual = useFormattedDate();

    return useMutation({
        mutationKey: ["insertar comentario"],
        mutationFn:()=>insertarComentario({
            comentario:p.comentario,
            id_usuario:dataUsuarioAuth?.id,
            id_publicacion:itemSelect?.id,
            fecha:fechaActual
        }),
        onError: (error)=>{
            toast.error("error al insertar comentario" + error.message);
        },
        onSuccess: ()=>{
            toast.success("comentario insertado");
            p.setComentario("");
        }
    });
}