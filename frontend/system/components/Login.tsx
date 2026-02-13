"use client";

import Image from "next/image";
import logo from "../../public/hemisferios-logo.png";
import lofi from "../../public/lofi.png";
import Input from "@/website/components/Input";
import { InputChange } from "@/website/modules/InputChangeHandlers";
import InputWarning from "@/website/components/InputWarning";
import { useState } from "react";

function SystemLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validation variabkes.
    const [validationsShot, setValidationsShot] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    function shootValidations(e: React.FormEvent) {
        setValidationsShot(true);
        e.preventDefault(); // We prevent the form from reloading the page.

        // Tal vez no habría necesidad de utilizar el módulo "InputChange". La validación de los inputs de este form pueden hacerse aquí mismo.

        if (!email) setEmailValidation(true);
        if (!password) setPasswordValidation(true);
    }

    return (
        <div className="relative overflow-x-hidden overflow-y-hidden flex flex-row min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
            <main className="login-container w-full min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="container flex flex-col gap-10 items-start justify-center lg:max-w-7/12">
                    <Image src={logo} alt="Logo" className="sm:w-42 w-32 h-auto" />

                    <h1 className="text-3xl font-semibold tracking-tighter text-slate-900">Iniciar sesión</h1>

                    <form id="loginForm" onSubmit={(e) => shootValidations(e)} className="inputs flex flex-col gap-4 w-full">
                        <Input grayBg={true} label="Correo electrónico:" type="text" textValue={email} activeValidation={emailValidation} onInputChange={(e) => InputChange(e, email, setEmail, validationsShot, setEmailValidation)} />
                        {emailValidation && (
                            <InputWarning message="Por favor, escribe un correo electrónico." />
                        )}

                        <Input grayBg={true} label="Contraseña:" type="text" textValue={password} activeValidation={passwordValidation} onInputChange={(e) => InputChange(e, password, setPassword, validationsShot, setPasswordValidation)} />
                        {passwordValidation && (
                            <InputWarning message="Por favor, ingresa una contraseña." />
                        )}

                    </form>

                    <button form="loginForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400 w-full">
                        Entrar al sistema
                    </button>

                    <p className="uppercase text-sm font-normal text-slate-600">© HEMISFERIOS 2026. TODOS LOS DERECHOS RESERVADOS.</p>
                </div>
            </main>

            <main className="illustration-container w-full min-h-screen bg-indigo-500 flex flex-col items-center justify-center gap-12">
                <div className="text flex flex-col gap-3 text-white">
                    <h1 className="text-4xl font-semibold tracking-tighter">¡Bienvenid@ de vuelta!</h1>

                    <p className="text-base font-normal">Inicia sesión para acceder de nuevo al sistema.</p>
                </div>

                <Image src={lofi} alt="Logo" className="sm:w-80 w-40 h-auto" />
            </main>
        </div>
    )
}

export default SystemLogin;