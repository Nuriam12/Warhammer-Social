import { Icon } from "@iconify/react";
import {BtnClose} from "../UI/buttons/BtnClose"
import { useInsertarComentarioMutate, useMostrarComentariosQuery } from "../../stack/ComentariosStack";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useComentariosStore } from "../../Store/ComentariosStore";
import { useUsuariosStore } from "../../Store/UsuariosStore";
import { SpinnerLocal } from "../UI/buttons/spinners/SpinnerLocal";
import { data } from "react-router-dom";
import { ComentarioCard } from "./ComentarioCard";


export const ComentariosModal = ({item,onClose}) => {
    const [comentario,setComentario] = useState("");
    const {mutate:comentarioMutate} = useInsertarComentarioMutate({comentario:comentario,setComentario:setComentario});
    const [showEmojPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);
    const textComentarioRef = useRef(null);
    const {setShowModal} = useComentariosStore();
    const {data:dataComentarios,isLoading:isLoadingComentarios} = useMostrarComentariosQuery();
    const {dataUsuarioAuth} = useUsuariosStore();

    const addEmoji = (emojiData) => {
        const emojiChar = emojiData.emoji;
        const textarea = textComentarioRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const originalText = textarea.value;

        const newText = originalText.substring(0, start) + emojiChar + originalText.substring(end);
        setShowEmojiPicker(false);
        setComentario(newText);
    };

        useEffect (()=>{
            const handleClickOutside = (e) => {
                if(pickerRef.current && !pickerRef.current.contains(e.target)){
                    setShowEmojiPicker(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
                return ()=> document.removeEventListener("mousedown",handleClickOutside);
        },
        []);

    return (
        <main className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <section className="bg-white dark:bg-neutral-900 rounded-xl w-full max-w-2xl max-h[90vh] overflow-hidden shadow-xl flex flex-col relative">
                <header className="h-25 sticky p-4 border-b border-gray-400/20  ">
                    <div className="flex items-center gap-3 text-black dark:text-white">
                        <img src={item?.foto_usuario} className='w-12 h-12 rounded-full object-cover' />
                        <div className="flex items-center gap-2">
                            <span className="font-bold lg:max-w-none lg:overflow-visible md:text-ellipsis max-w-[100px] truncate whitespace-nowrap overflow-hidden">{item?.nombre_usuario}</span>
                        </div>
                    </div>
                    <div>{item?.descripcion}</div>
                    <BtnClose funcion={setShowModal} />
                </header>
                <section className="p-4 overflow-y-auto flex-1">
                    {isLoadingComentarios ?(<SpinnerLocal/>):(dataComentarios.length > 0 && dataComentarios.map((item,index)=>{
                        return (
                            <ComentarioCard item={item} key={index}/>
                        )
                    }))}
                        
                    
                    <p></p>
                </section>
                <footer className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900">
                    <section className="w-full gap-2 flex flex-col">
                        <section className="flex w-full gap-4">
                            <img src={item?.foto_usuario} className="w-10 h-10 rounded-full object-cover" alt="avatar"/>
                            <input ref={textComentarioRef}
                            value={comentario}
                            onChange={(e)=>setComentario(e.target.value)}
                            placeholder="Escribe un comentario..." className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none" />

                            {
                            showEmojPicker &&( <div className="absolute top-10 left-10 mt-2" ref={pickerRef}>                                                  
                            <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled  /> </div> )      
                            }

                            <button  className="text-gray-500 hover:text-gray-700 relative"onClick={()=>setShowEmojiPicker(!showEmojPicker)}>
                                <Icon icon="mdi:emoji-outline" width="24" height="24" />
                            </button>
                        </section>
                        <section className="flex justify-end">
                            <button className="flex justify-end gap-1 px-4 py-2 rounded-full text-sm text-gray-500 cursor-not-allowed"onClick={comentarioMutate}>
                                <Icon icon="fluent:send-16-filled" width="16" height="16" />
                                Publicar
                            </button>
                        </section>
                    </section>
                </footer>
            </section>
        </main>
    );}
