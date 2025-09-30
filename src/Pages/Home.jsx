import { Toaster } from "sonner";
import { FormPost } from "../componentes/Formularios/FormPost";
import { HeaderSticky } from "../componentes/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../componentes/HomePageComponents/InputPublicar";
import { PublicacionCard } from "../componentes/HomePageComponents/PublicacionCard";
import { usePostStore } from "../Store/PostStore";
import { useMostrarPostQuery } from "../stack/PostStack";
import { useEffect, useRef } from "react";
import { SpinnerLocal } from "../componentes/UI/buttons/spinners/SpinnerLocal";
import { useSupabaseSubscription } from "../componentes/Hooks/useSupaBaseSubscription";
import { ComentariosModal } from "../componentes/HomePageComponents/ComentariosModal";
import { useComentariosStore } from "../Store/ComentariosStore";
import { useMostrarRespuestaComentariosQuery } from "../stack/RespuestasComentariosStack";
import { FormActualizarPerfil } from "../componentes/Formularios/FormActualizarPerfil";
import { useUsuariosStore } from "../Store/UsuariosStore";
export const Home = () => {
  const { stateForm, setStateForm, itemSelect } = usePostStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const { data: dataRespuestaComentario } =
    useMostrarRespuestaComentariosQuery();
  const {
    data: dataPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPost,
  } = useMostrarPostQuery();
  const scrollRef = useRef(null);
  const { showModal } = useComentariosStore();

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useSupabaseSubscription({
    channelName: "public:publicaciones",
    options: { event: "*", schema: "public", table: "publicaciones" },
    queryKey: ["mostrar post"],
  });

  useSupabaseSubscription({
    channelName: "public:comentarios",
    options: { event: "*", schema: "public", table: "comentarios" },
    queryKey: ["mostrar comentarios"],
  });

  useSupabaseSubscription({
    channelName: "public:respuestas_comentarios",
    options: { event: "*", schema: "public", table: "respuestas_comentarios" },
    queryKey: ["mostrar respuesta comentarios"],
  });

   useSupabaseSubscription({
    channelName: "public:usuarios",
    options: { event: "*", schema: "public", table: "usuarios" },
    queryKey: ["contar usuarios todos"],
  });

  return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
      {dataUsuarioAuth?.foto_perfil === "-" && <FormActualizarPerfil />}

      <Toaster position="top-left" />
      {stateForm && <FormPost />}
      <section className="flex flex-col w-full h-screen">
        <article className="flex flex-col h-screen overflow-hidden border border-gray-600 border-t-0 border-b-0 dark:border-gray-600">
          <HeaderSticky />
          <div ref={scrollRef} className="overflow-y-auto">
            <InputPublicar />
            {dataPost?.pages?.map((page, pageIndex) =>
              page?.map((item, index) => (
                <PublicacionCard key={`${pageIndex}-${index}`} item={item} />
              ))
            )}
            {isFetchingNextPage && <SpinnerLocal />}
          </div>
        </article>
        <article>SIDEBAR DERECHO</article>
      </section>
      {showModal && <ComentariosModal />}
    </main>
  );
};
