import { useState } from "react";
import Sidebar from "./Sidebar";
import SmallModal from "./modals/SmallModal";
import { useLoginStore } from "../modules/LoginStore";
import { redirect } from 'next/navigation';

type LoginStore = {
    adminEmail: string,
    adminPassword: string,
    isUserLogged: boolean,
    changeSessionStatus: (newStatus: boolean) => void;
}

type SystemLayoutProps = {
    sidebarPage: string,
    children: React.ReactNode;
}

function SystemLayout(props: SystemLayoutProps) {
    const [logoutModal, setLogoutModal] = useState(false);
    const [sessionStatus, setSessionStatus] = useState(false);
    const updateSessionStatus = useLoginStore((state: LoginStore) => state.changeSessionStatus);
    const sessionStore = useLoginStore((state: LoginStore) => state.isUserLogged);

    if (sessionStore === false) {
        redirect("/system");
    };

    return (
        <div className="relative overflow-x-hidden overflow-y-hidden min-h-screen flex lg:flex-row flex-col items-center justify-center bg-slate-100 font-sans dark:bg-black">
            <SmallModal title="Cerrar sesión"
                message="¿Estás segur@ de que quieres salir del sistema?"
                isVisible={logoutModal} onClose={() => setLogoutModal(false)}
                confirmationBtnText="Cerrar sesión"
                onSave={() => updateSessionStatus(false)}
            />

            <Sidebar activePage="appointments" onLogoutPressed={() => setLogoutModal(true)} />

            <main className="min-h-screen w-full flex flex-col p-12">
                {props.children}
            </main>
        </div>
    );
};

export default SystemLayout;