// Decided to use a separated component for the navigation menu for smaller screen sizes, since its behaviour should be sticky in the top.

import { useState } from "react";
import Link from "next/link";
import logo from "../../public/hemisferios-logo.png";
import SidebarLink from "./SidebarLink";
import Image from "next/image";
import { ClipboardClock, History, CircleUserRound, Heart, ChartBar, MessageCircle, Settings, LogOut, Menu } from "lucide-react";

type NavbarProps = {
    activePage: "appointments" | "history" | "patients" | "therapists" | "statistics" | "comments" | string;
    onLogoutPressed: () => void;
    onCredentialsPressed: () => void;
}

function MobileNavbar(props: NavbarProps) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <div className="sticky z-999 top-0 w-full bg-white md:hidden flex flex-col gap-6 border-b border-slate-200 py-4 md:px-16 px-8">
            <div className="w-full justify-between items-center flex flex-row">
                <Image src={logo} alt="Logo" className="sm:w-42 w-32 h-auto" />

                <button onClick={toggleOpen} className="bg-slate-100 border-2 border-slate-200 p-2.5 rounded-lg lg:hidden block text-slate-500">
                    <Menu size={20} />
                </button>
            </div>

            {/* Collapsable menu for smaller screen sizes */}
            {open && (
                <div className="w-full flex flex-col gap-2 bg-slate-100 border border-slate-200 p-4 rounded-lg">
                    <Link href={"/system/appointments"}>
                        <SidebarLink name="Registro de citas" icon={<ClipboardClock size={18} />} isActive={props.activePage === "appointments"} />
                    </Link>

                    <Link href={"/system/history"}>
                        <SidebarLink name="Historial de citas" icon={<History size={18} />} isActive={props.activePage === "history"} />
                    </Link>

                    <Link href={"/system/patients"}>
                        <SidebarLink name="Pacientes" icon={<CircleUserRound size={18} />} isActive={props.activePage === "patients"} />
                    </Link>

                    <Link href={"/system/patients"}>
                        <SidebarLink name="Terapeutas" icon={<Heart size={18} />} isActive={props.activePage === "therapists"} />
                    </Link>

                    <SidebarLink name="Estadísticas" icon={<ChartBar size={18} />} isActive={props.activePage === "statistics"} />

                    <SidebarLink name="Comentarios" icon={<MessageCircle size={18} />} isActive={props.activePage === "statistics"} />

                    <SidebarLink onClick={props.onCredentialsPressed} name="Credenciales" icon={<Settings size={18} />} isActive={props.activePage === ""} />

                    <SidebarLink onClick={props.onLogoutPressed} name="Cerrar sesión" icon={<LogOut size={18} />} isActive={props.activePage === ""} />
                </div>
            )}
        </div>
    )
}

export default MobileNavbar;