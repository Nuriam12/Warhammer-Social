import { useRespuestasComentariosStore } from "../../Store/RespuestasComentariosStore";
import { useRelativeTime } from "../Hooks/useRelativeTime";
import { InputRespuestaAComentario } from "../HomePageComponents/InputRespuestaAComentario";
import { useMostrarRespuestaComentariosQuery } from "../../stack/RespuestasComentariosStack";
import { useComentariosStore } from "../../Store/ComentariosStore";
import { RespuestaCard } from "./RespuestaCard";
export const ComentarioCard = ({ item }) => {
  const {
    respuestaActivaParaComentarioId,
    limpiarRespuestaActiva,
    setRespuestaActiva,
    dataRespuestaAComentario,
  } = useRespuestasComentariosStore();
  const {setItemSelect,itemSelect:itemSelectComentario} = useComentariosStore();
  
  return (
    <div className="pl-4">
      <div className="flex items-start gap-2 group relative w*full">
        <img
          src={item?.foto_usuario}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1 relative">
          <div className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-sm w-f max-w-[90%] flex gap-2">
            <section>
              <span className="font-semibold block text-xs">
                {item?.nombre_usuario}
              </span>
              <p>{item?.comentario}</p>
            </section>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-gray-500 ml-2 relative">
            <span>{useRelativeTime(item?.fecha)}</span>
            <button
              className=" hover:underline cursor-pointer"
              onClick={() =>
                respuestaActivaParaComentarioId === item?.id
                  ? limpiarRespuestaActiva()
                  : setRespuestaActiva(item?.id)
              }
            >
              {respuestaActivaParaComentarioId === item?.id
                ? "cancelar"
                : "responder"}
            </button>
          </div>
          {item?.respuestas_count > 0 && (
            <button className="text-gray-400 mt-2 text-xs hover:underline cursor-pointer" onClick={()=>setItemSelect(item)}>
              {item?.respuestas_count === 1
                ? `ver ${item?.respuestas_count} respuesta`
                : `ver las ${item?.respuestas_count} respuestas`}
            </button>
          )}
          {
            itemSelectComentario?.id === item?.id &&
            dataRespuestaAComentario?.map((item,index)=>{
              return(
                <RespuestaCard key={item.id} item={item}/>
              )
            })
          }
          {respuestaActivaParaComentarioId === item?.id && (
            <div>
              <div className="w-4 h-4 border-1-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-[8px] absolute bottom-18 -ml-[29px]" />
              <InputRespuestaAComentario />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
