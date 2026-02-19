import { TagType } from "@/system/modules/Types";

type TagProps = {
    type: "finished" | "pending" | "cancelled";
}

type TagFeatures = {
    finished: TagType,
    pending: TagType,
    cancelled: TagType
}

const tagStyles: TagFeatures = {
    finished: {
        name: "Terminada",
        color: "bg-[#22c55e]",
        textColor: "text-[#22c55e]",
        bgColor: "bg-[rgb(34,197,94,0.08)]",
        borderColor: "border-[#22c55e]",
    },
    pending: {
        name: "Pendiente",
        color: "bg-[#eab308]",
        textColor: `text-[#eab308]`,
        bgColor: "bg-[rgb(234,179,8,0.08)]",
        borderColor: "border-[#eab308]",
    },
    cancelled: {
        name: "Cancelada",
        color: "bg-[#f43f5e]",
        textColor: "text-[#f43f5e]",
        bgColor: "bg-[rgb(244,63,94,0.08)]",
        borderColor: "border-[#f43f5e]"
    }
};

function AppointmentTag(props: TagProps) {
    return (
        <div className={`flex flex-row gap-1 items-center justify-center border px-2.5 py-0.5 rounded-full ${tagStyles[props.type].textColor} ${tagStyles[props.type].bgColor} ${tagStyles[props.type].borderColor} `}>
            <div className={`w-1.5 h-1.5 rounded-[50%] ${tagStyles[props.type].color}`}></div>
            <p className="text-xs font-medium">
                {tagStyles[props.type].name}
            </p>
        </div>
    )
}

export default AppointmentTag;