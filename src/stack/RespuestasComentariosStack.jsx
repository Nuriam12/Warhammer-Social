import { useMutation, useQuery } from "@tanstack/react-query"
import { useRespuestasComentariosStore } from "../Store/RespuestasComentariosStore"
import { useFormattedDate } from "../componentes/Hooks/useFormattedDate";
import { useUsuariosStore } from "../Store/UsuariosStore";
import { useComentariosStore } from "../Store/ComentariosStore";

export const useInsertarRespuestaComentarioMutate = () =>{
    const {insertarRespuestaAComentarios,respuestaActivaParaComentarioId,respuesta,setRespuesta} = useRespuestasComentariosStore();
    const{fechaActual}=useFormattedDate();
    const{dataUsuarioAuth}=useUsuariosStore();
    return useMutation ({
        mutationKey:["insertar respuesta a comentario"],
        mutationFn: () => insertarRespuestaAComentarios({
            id_comentario: respuestaActivaParaComentarioId,
            comentario:respuesta,
            fecha:fechaActual,
            id_usuario:dataUsuarioAuth.id,
        }),
        onError:(error)=>{toast.error("error al insertar respuesta" + error.message);},
        onSuccess: () => {toast.success("Respuesta enviada");
            setRespuesta("")
        },
    });
};

export const useMostrarRespuestaComentariosQuery = () => {
  const {  mostrarRespuestaACcomentario } = useRespuestasComentariosStore();
  const { itemSelect } = useComentariosStore();
  return useQuery({
    queryKey: ["mostrar respuesta comentarios", { id_comentario: itemSelect?.id }],
    queryFn: () =>  mostrarRespuestaACcomentario({id_comentario: itemSelect?.id }),enabled:!!itemSelect,
  });
};
