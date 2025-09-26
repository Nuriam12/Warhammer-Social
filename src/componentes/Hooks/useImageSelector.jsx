import { useRef, useState } from "react";
import { usePostStore } from "../../Store/PostStore";
import imageCompression from 'browser-image-compression';
import { Icon } from "@iconify/react";

export const useImageSelector = () => {
    const [file,setFile]= useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType]= useState ("");
    const fileInputRef = useRef (null);
    const [isDragging, setIsDragging]= useState(false);
    const {setFile:setFilePost} = usePostStore();
    const openFileSelector = () => {
        fileInputRef.current?.click();
    };
    const handleImageChange = async (e) =>{ //este hook maneja todo el flujo cuando subes imagenes o videos 
        const selectedFile = e.target.files[0]; //OBITENES EL ARCHIVO
        if (!selectedFile) return;

        const sizeMB = selectedFile.size/(1024*1024); //CALCULAMOS EL TAMAÑO

        const type = selectedFile.type;
        if(!type.startsWith("image/")&& !type.startsWith("video/")){ //VALIDA EL TIPO DE ARCHIVO
            alert("solo se permiten imagenes o videos");
            return;
        }
        if (type.startsWith("image/")){
                    if(sizeMB>8){
            alert("el archivo supera el limite de 8mb ");
            return;
        }
        try {
                const options = {
                maxSizeMB: sizeMB>1?0.1:0.2,
                maxWidthOrHeight: 1920,
                useWebWorker: true
                };
                const compressedFile = await imageCompression(selectedFile,options)
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = () => setFileUrl (reader.result);
                setFile(compressedFile);
                setFilePost(compressedFile);
                setFileType("image");
            
            } catch (error) {
                console.error("Error al comprimir la imagen:", error);
                alert("Error al procesar imagen.");
            }
        }else {
            const videoUrl = URL.createObjectURL(selectedFile); //CREA UN OBJETO URL PARA PODER PREVISUALIZAR EL VIDEO
            setFile(selectedFile);
            setFilePost(selectedFile);
            setFileUrl(videoUrl);
            setFileType("video");
        }
    }
    const removeImage = () => { //con esto quitamos la imagen //
        setFile(null);
        setFileUrl("");
        setFileType("");
        if(fileInputRef.current){
            fileInputRef.current.value="";
        }
    }
    const handleDragEnter = (e) => { //arrastramos imagenes//
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }
    const handleDragLeave = (e) => { //anulamos arrastre
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }
    const handleDragOver = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }
    const handleDrop = async (e) => { //una vez arrastrado el archivo se sube 
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0]
        if(!droppedFile)return;
        await handleImageChange ({target:{files:[droppedFile]}})
    }

    return {
        file, fileUrl,fileType, fileInputRef,handleImageChange,openFileSelector,removeImage,isDragging,handleDragEnter,handleDragLeave,handleDragOver,handleDrop
    };
};

export const ImageSelector = () =>{
    const {setStateImage} = usePostStore
    const {file, fileUrl,fileType, fileInputRef,handleImageChange,openFileSelector,removeImage,isDragging,handleDragEnter,handleDragLeave,handleDragOver,handleDrop} = useImageSelector();
    return (
        <section className="relative w-full max-w-md bg-[#242526 rounded-lg shadow-xl overflow-hidden]">
            <header className="relative h-12 flex items-center justify-center border-b border-gray-700">
                <h2>agregar fotos o videos</h2>
                <button onClick={setStateImage} className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-200" >
                    <Icon icon="material-symbols:close" width="24" height="24" />
                </button>
            </header>
            <main className={`p-8 flex flex-col items-center justify-center min-h-[240px] transition-color duration-300 ${isDragging?"bg-[#3a3b3c]":"bg-[#242526]"}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                    {
                        fileUrl ? (<div className="relative inline-block group " >
                            {fileType === "image" ? (<img src={fileUrl} className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"/>): (<video controls src={fileUrl} className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain"/>)}

                            <button onClick={removeImage} type="button" className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full border-one cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-80">
                                <Icon icon="material-symbols:close" width="24" height="24" />
                            </button>
                            <button type="button" onClick={openFileSelector} className="absolute top-2 right-12 w-8 h-8 bg-black bg-opacity-60 rounded-full border-one cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-80">
                                <Icon icon="streamline-plump:camera-video" width="48" height="48" />
                            </button>
                        </div>
                        ):(
                        <div>
                            <div className="w-16 h-16 rounded-full bg-[#3a3b3c] flex items-center justify-center mb-1 ml-12">
                                <Icon icon="streamline-plump:camera-video" width="48" height="48" />
                            </div>
                            <button onClick={openFileSelector} className="mt-6 px-4 py-2 bg-[#3a3b3c] text-white rounded-lg hover:bg-[#4a4b4c] transition-colors duration-200 cursor-pointer ">
                                Selecionar archivos
                            </button>
                        </div>) 
                    }
            </main>
            <input type="file" accept="image/*,video/*" ref={fileInputRef} onChange={handleImageChange}  />
        </section>
    )
}