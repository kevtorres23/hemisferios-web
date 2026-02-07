import ContactChannel from "./ContactChannel";
import { Phone, Mail, MapPin } from "lucide-react";

type ChannelBoxProps = {
    showContainer: boolean;
    title: string;
    areChannelsGray: boolean;
}

function ChannelBox(props: ChannelBoxProps) {
    return (
        <div className={`relative w-full flex flex-col items-center justify-center ${props.showContainer ? "sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl md:p-8" : ""} gap-5 transition-opacity duration-900 ease-in`}>
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight self-start">{props.title}</h1>

            <div className="w-full flex sm:flex-row flex-col gap-5">
                <ContactChannel
                    color="bg-green-500"
                    icon={<Phone size={18} color="white" />}
                    name="Número de teléfono"
                    description="618-206-8767"
                    isGray={props.areChannelsGray}
                />

                <ContactChannel
                    color="bg-orange-500"
                    icon={<Mail size={18} color="white" />}
                    name="Correo electrónico"
                    description="arlet28torres@gmail.com"
                    isGray={props.areChannelsGray}
                />
            </div>

            <ContactChannel
                color="bg-pink-500"
                icon={<MapPin size={18} color="white" />}
                name="Dirección del centro"
                description="Valle Florido S/N, Colonia La Esperanza, Durango, Durango."
                isGray={props.areChannelsGray}
            />
        </div>
    )
}

export default ChannelBox;