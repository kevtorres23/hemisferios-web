import Image from "next/image";
import logo from "../../public/hemisferios-logo.png";
import SidebarLink from "./SidebarLink";
import { ClipboardClock, History, CircleUserRound, Heart, ChartBar, MessageCircle, Settings, LogOut } from "lucide-react";

type SidebarProps = {
    activePage: "appointments" | "history" | "patients" | "therapists" | "statistics" | "comments" | "";
    onLogoutPressed: () => void;
}

function Sidebar(props: SidebarProps) {
    return (
        <div className="sticky min-h-screen lg:w-70 w-full p-6 bg-white border-r border-slate-200 flex flex-col items-center justify-between">
            <div className="upper-section flex flex-col gap-4 items-center justify-center w-full">
                <Image src={logo} alt="Logo" className="sm:w-32 w-28 h-auto" />

                <div className="divisory-line w-full h-px bg-slate-200"></div>

                <div className="link-container flex flex-col gap-2 w-full">
                    <SidebarLink name="Registro de citas" icon={<ClipboardClock size={18} />} isActive={props.activePage === "appointments"} />

                    <SidebarLink name="Historial de citas" icon={<History size={18} />} isActive={props.activePage === "history"} />

                    <SidebarLink name="Pacientes" icon={<CircleUserRound size={18} />} isActive={props.activePage === "patients"} />

                    <SidebarLink name="Terapeutas" icon={<Heart size={18} />} isActive={props.activePage === "therapists"} />

                    <SidebarLink name="Estadísticas" icon={<ChartBar size={18} />} isActive={props.activePage === "statistics"} />

                    <SidebarLink name="Comentarios" icon={<MessageCircle size={18} />} isActive={props.activePage === "statistics"} />
                </div>
            </div>

            <div className="lower-section flex flex-col gap-2 w-full">
                <SidebarLink name="Credenciales" icon={<Settings size={18} />} isActive={props.activePage === ""} />

                <SidebarLink onClick={props.onLogoutPressed} name="Cerrar sesión" icon={<LogOut size={18} />} isActive={props.activePage === ""} />
            </div>
        </div>
    )
}

export default Sidebar;