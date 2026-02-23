"use client";

import Image from "next/image";
import logo from "../../public/hemisferios-logo.png";
import lofi from "../../public/lofi.png";
import Input from "@/website/components/Input";
import { redirect } from 'next/navigation';
import InputWarning from "@/website/components/InputWarning";
import { useState } from "react";
import { useLoginStore } from "../modules/LoginStore";

type LoginStore = {
    adminEmail: string,
    adminPassword: string,
    isUserLogged: boolean,
    changeSessionStatus: (newStatus: boolean) => void;
}

function SystemLogin() {

    // Input variables.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validation variables.
    const [validationsShot, setValidationsShot] = useState(false);
    const [emailValidation, setEmailValidation] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("");

    // State variables (Zustand).
    const savedEmail = useLoginStore((state: LoginStore) => state.adminEmail);
    const savedPassword = useLoginStore((state: LoginStore) => state.adminPassword);
    const updateSessionStatus = useLoginStore((state: LoginStore) => state.changeSessionStatus);
    const sessionStore = useLoginStore((state: LoginStore) => state.isUserLogged);

    if (sessionStore === true) {
        redirect("/system/appointments");
    }

    function shootValidations(e: React.FormEvent) {
        setValidationsShot(true);
        e.preventDefault(); // We prevent the form from reloading the page.

        if (!email) {
            setEmailValidation("empty")
        };
        if (!password) {
            setPasswordValidation("empty")
        };

        if (email && password) {
            if ((email === savedEmail) && (password === savedPassword)) {
                updateSessionStatus(true);
            };

            if (email != savedEmail) {
                setEmailValidation("wrong");
            }

            if (password != savedPassword) {
                setPasswordValidation("wrong");
            }
        };
    }

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
        setEmailValidation("");
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
        setPasswordValidation("");
    }

    return (
        <div className="relative overflow-x-hidden overflow-y-hidden flex sm:flex-row flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
            <main className="login-container w-full min-h-screen bg-white flex flex-col items-center justify-center sm:px-0 px-8 md:py-0 py-16">
                <div className="container flex flex-col gap-10 items-start justify-center lg:max-w-7/12 sm:max-w-9/12">
                    <Image src={logo} alt="Logo" className="sm:w-42 w-32 h-auto" />

                    <h1 className="text-3xl font-semibold tracking-tighter text-slate-900">Iniciar sesión</h1>

                    <form id="loginForm" onSubmit={(e) => shootValidations(e)} className="inputs flex flex-col gap-4 w-full">
                        <Input grayBg={true} label="Correo electrónico:" type="text" textValue={email} activeValidation={emailValidation != ""} onInputChange={onEmailChange} />
                        {(emailValidation != "") && (
                            <InputWarning message={emailValidation === "empty" ? "Por favor, ingresa un correo." : "El correo ingresado es incorrecto."} />
                        )}

                        <Input grayBg={true} label="Contraseña:" type="text" textValue={password} activeValidation={passwordValidation != ""} onInputChange={onPasswordChange} />
                        {(passwordValidation != "") && (
                            <InputWarning message={passwordValidation === "empty" ? "Por favor, ingresa una contraseña." : "La contraseña ingresada es incorrecta."} />
                        )}

                    </form>

                    <button form="loginForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400 w-full">
                        Entrar al sistema
                    </button>

                    <p className="uppercase text-sm font-normal text-slate-600">© HEMISFERIOS 2026. TODOS LOS DERECHOS RESERVADOS.</p>
                </div>
            </main>

            <main className="illustration-container w-full md:min-h-screen h-screen bg-indigo-500 flex flex-col items-center justify-center gap-12 lg:px-0 sm:px-10 px-8 md:py-0 py-16">
                <div className="text flex flex-col gap-3 text-white">
                    <h1 className="lg:text-4xl text-3xl font-semibold tracking-tighter text-center">¡Bienvenid@ de vuelta!</h1>

                    <p className="text-base font-normal text-center">Inicia sesión para acceder de nuevo al sistema.</p>
                </div>

                <Image src={lofi} alt="Logo" className="md:w-80 w-60 h-auto" />
            </main>
        </div>
    )
}

export default SystemLogin;