import { useState, useContext } from "react";
import { CardActionContext } from "@/app/system/comments/page";
import { MessageSquare, Check, Trash, Calendar, Phone, Mail } from "lucide-react";
import { CommentType } from "@/utils/types";

function TherapistCard(props: CommentType) {
    const setAction = useContext(CardActionContext);

    return (
        <div className={`relative flex flex-col gap-2.5 overflow-y-visible rounded-md ${props.status === "unseen" ? "bg-white" : "bg-slate-100"} border border-slate-200 p-6 items-start justify-center overflow-x-hidden`}>

            <div className="relative w-full flex flex-row justify-between items-center">
                <div className="user-badge p-1.5 rounded-md bg-[rgb(136,56,245,0.12)]">
                    <MessageSquare size={24} className="text-purple-500" />
                </div>

                <div className="actions flex flex-row gap-2">

                    {props.status === "unseen" && (
                        <Check onClick={() => setAction("mark-read")} size={18} className="text-slate-400 hover:text-indigo-500 cursor-pointer" />
                    )}

                    <Trash onClick={() => setAction("remove")} size={18} className="text-slate-400 hover:text-indigo-500 cursor-pointer" />
                </div>
            </div>

            <p className="text-base font-medium text-slate-900">{props.name} {props.lastName}</p>

            <div className="flex flex-row gap-5 items-center justify-center">
                <div className="flex flex-row gap-1 items-center justify-center text-slate-500">
                    <Phone size={16} />
                    <p className="text-sm">{props.phoneNumber}</p>
                </div>

                <div className="flex flex-row gap-1 items-center justify-center text-slate-500">
                    <Calendar size={16} />
                    <p className="text-sm">{props.date}</p>
                </div>
            </div>

            <div className="flex flex-row gap-1 items-center justify-center text-slate-500">
                <Mail size={16} />
                <p className="text-sm">{props.email}</p>
            </div>

            <p onClick={() => setAction("see")} className="text-sm font-medium text-indigo-500 cursor-pointer">Ver comentario</p>
        </div>
    );
};

export default TherapistCard;