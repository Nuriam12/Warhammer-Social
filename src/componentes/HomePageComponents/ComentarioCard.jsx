export const ComentarioCard = ({item}) => {
    return (
        <div className="pl-4">
            <span>ComentarioCard</span>
            <div className="flex items-start gap-2 group relative w*full">
                <img src={item?.foto_usuario} className="w-9 h-9 rounded-full object-cover"/>
                <div className="flex-1 relative" >
                    <div className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-sm w-fit max-w-[90%] flex gap-2">
                        <section>
                            <span className="font-semibold block text-xs">
                                {item?.nombre_usuario}
                            </span>
                            <p>
                                {item?.comentario}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};