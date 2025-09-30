import { useUsuariosStore } from "../../Store/UsuariosStore";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useInsertarRespuestaComentarioMutate } from "../../stack/RespuestasComentariosStack";
import { Icon } from "@iconify/react";
import { useRespuestasComentariosStore } from "../../Store/RespuestasComentariosStore";

export const InputRespuestaAComentario = () => {
  const{setRespuesta} = useRespuestasComentariosStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const [showEmojPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);
  const textComentarioRef = useRef(null);
  const [comentario, setComentario] = useState("");
  const { mutate: comentarioMutate } = useInsertarRespuestaComentarioMutate();

  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textComentarioRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;

    const newText =
      originalText.substring(0, start) +
      emojiChar +
      originalText.substring(end);
    setShowEmojiPicker(false);
    setComentario(newText);
    setRespuesta(newText)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <section className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900">
      <section className="w-full gap-2 flex flex-col">
        <section className="flex w-full gap-4">
          <img
            src={dataUsuarioAuth?.foto_usuario}
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
          <input
            ref={textComentarioRef}
            value={comentario}
            onChange={(e) => {
              setRespuesta(e.target.value);
              setComentario(e.target.value);}}
            placeholder="Escribe un comentario..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
          />
          {showEmojPicker && (
            <div className="absolute top-10 left-10 mt-2" ref={pickerRef}>
              <EmojiPicker
                onEmojiClick={addEmoji}
                theme="auto"
                searchDisabled
              />{" "}
            </div>
          )}
          <button
            className="text-gray-500 hover:text-gray-700 relative"
            onClick={() => setShowEmojiPicker(!showEmojPicker)}
          >
            <Icon icon="mdi:emoji-outline" width="24" height="24" />
          </button>
        </section>
        <section className="flex justify-end">
          <button
            className={`flex justify-end gap-1 px-4 py-2 rounded-full text-sm ${
                  comentario.trim() === ""
                    ? "cursor-not-allowed text-gray-500"
                    : "cursor-pointer text-[#00AEF0] hover:bg-blue-600/10 "
                } `}
            onClick={() => comentarioMutate({ comentario })}
          >
            <Icon icon="fluent:send-16-filled" width="16" height="16" />
            Publicar
          </button>
        </section>
      </section>
    </section>
  );
};
