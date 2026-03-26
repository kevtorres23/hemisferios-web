import { useState } from "react";
import Sidebar from "./Sidebar";
import SmallModal from "./modals/SmallModal";
import { useLoginStore } from "../../utils/system/login-store";
import { redirect } from 'next/navigation';
import Input from "./Input";
import InputWarning from "@/components/website/InputWarning";
import MobileNavbar from "./MobileNavbar";
import toast, { Toaster } from 'react-hot-toast';
import api from "@/lib/axios";

type LoginStore = {
    adminEmail: string,
    adminPassword: string,
    isUserLogged: boolean,
    updateEmail: (newEmail: string) => void,
    updatePassword: (newPassword: string) => void,
}

type SystemLayoutProps = {
    sidebarPage: string,
    children: React.ReactNode;
    isAnyModal?: boolean;
    modals?: React.ReactNode;
}

function SystemLayout(props: SystemLayoutProps) {

    // Login store variables.
    const savedEmail = useLoginStore((state: LoginStore) => state.adminEmail);
    const savedPassword = useLoginStore((state: LoginStore) => state.adminPassword);
    const updateSessionEmail = useLoginStore((state: LoginStore) => state.updateEmail);
    const updateSessionPassword = useLoginStore((state: LoginStore) => state.updatePassword);

    // Modal variables.
    const [logoutModal, setLogoutModal] = useState(false);
    const [credentialsModal, setCredentialsModal] = useState(false);
    const [areValidsActive, setAreValidsActive] = useState(false);
    const [credentialEmail, setCredentialEmail] = useState(savedEmail);
    const [credentialPassword, setCredentialPassword] = useState(savedPassword);

    function onSaveCredentials(e: React.SubmitEvent) {
        setAreValidsActive(true);
        e.preventDefault(); // We prevent the form from reloading the page.

        if (credentialEmail && credentialPassword) {
            const newCredentials = {
                email: credentialEmail,
                password: credentialPassword
            };

            try {
                api.put("/credentials", newCredentials);
                updateSessionEmail(credentialEmail);
                updateSessionPassword(credentialPassword);
            } catch (error) {
                console.log("An error ocurred while updating the session credentials:", error);
            } finally {
                setCredentialsModal(false);
                toast.success(<p>¡Credenciales actualizadas!</p>, { duration: 2500 })

            }
        };
    };

    async function onLogout() {
        try {
            await fetch("/logout/api", {
                method: "GET"
            });
        } catch (error) {
            console.log(error);
        } finally {
            redirect("/system");
        };
    };

    return (
        <>
            <MobileNavbar activePage={props.sidebarPage} onLogoutPressed={() => setLogoutModal(true)} onCredentialsPressed={() => setCredentialsModal(true)} />

            <Sidebar activePage={props.sidebarPage} onLogoutPressed={() => setLogoutModal(true)} onCredentialsPressed={() => setCredentialsModal(true)} />

            <SmallModal title="Cerrar sesión"
                message="¿Estás segur@ de que quieres salir del sistema?"
                isVisible={logoutModal} onClose={() => setLogoutModal(false)}
                confirmationBtnText="Cerrar sesión"
                onSave={onLogout}
            />

            <SmallModal title="Configurar credenciales de sesión"
                message="A continuación, puedes actualizar las credenciales con las que se inicia sesión a este sistema."
                isVisible={credentialsModal} onClose={() => setCredentialsModal(false)}
                confirmationBtnText="Guardar cambios"
                onSave={() => onSaveCredentials}
                btnType="submit"
                btnForm="updateCredentialsForm"
            >

                <form action="" id="updateCredentialsForm" onSubmit={(e) => onSaveCredentials(e)} className="flex sm:flex-row flex-col w-full gap-3">
                    <div className=" flex flex-col gap-2 w-full">
                        <Input type="text"
                            label="Correo electrónico:"
                            grayBg={true} value={credentialEmail}
                            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentialEmail(e.currentTarget.value)}
                            activeValidation={!credentialEmail && areValidsActive}
                        />

                        {(!credentialEmail && areValidsActive) && (
                            <InputWarning message="Por favor, ingresa un correo." />
                        )}
                    </div>

                    <div className=" flex flex-col gap-2 w-full">
                        <Input type="text"
                            label="Contraseña:"
                            grayBg={true} value={credentialPassword}
                            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentialPassword(e.currentTarget.value)}
                            activeValidation={!credentialPassword && areValidsActive}
                        />

                        {(!credentialPassword && areValidsActive) && (
                            <InputWarning message="Por favor, ingresa una contraseña." />
                        )}
                    </div>
                </form>

                {/* Any other modal(s) will be rendered here*/}
            </ SmallModal>

            <Toaster />

            {props.modals}

            <div className="relative overflow-x-hidden md:ml-70 ml-0 lg:min-h-screen h-auto flex md:flex-row flex-col items-start justify-center bg-slate-100 font-sans dark:bg-black">

                <main className={`w-full flex flex-col gap-8 sm:p-12 p-8 items-start justify-start ${(credentialsModal || props.isAnyModal) ? "sm:h-screen h-auto overflow-hidden" : "h-auto"}`}>
                    {props.children}
                </main>
            </div>
        </>
    );
};
export default SystemLayout;