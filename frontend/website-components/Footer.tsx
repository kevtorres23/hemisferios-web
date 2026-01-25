import Image from "next/image";
import Logo from "../public/hemisferios-logo.png";
import FooterLink from "./FooterLink";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";

function Footer() {
    return (
        <footer className="w-full bg-slate-100 border-t border-slate-200 sm:px-20 px-8 sm:py-24 py-12 flex lg:flex-row flex-col gap-12 justify-between items-start">
            <div className="w-full logo flex flex-col gap-4">
                <Image src={Logo} alt="Logo" className="w-42 h-auto" />
                <p className="uppercase text-sm font-normal text-slate-600">© HEMISFERIOS 2026. TODOS LOS DERECHOS RESERVADOS.</p>
            </div>

            <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 justify-between">
                <div className="quick-access flex flex-col gap-4">
                    <p className="uppercase text-sm font-semibold text-indigo-500">Acceso Rápido</p>
                    <FooterLink text="Inicio" />
                    <FooterLink text="Servicios y precios" />
                    <FooterLink text="Sobre nosotros" />
                </div>

                <div className="quick-access flex flex-col gap-4 items-start">
                    <p className="uppercase text-sm font-semibold text-indigo-500">Contacto</p>

                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Phone width={14} className="text-slate-600" />
                        <p className={"text-sm tracking-tight text-slate-500 font-normal"}>618-206-8767</p>
                    </div>

                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Mail width={14} className="text-slate-600" />
                        <p className={"text-sm tracking-tight text-slate-500 font-normal"}>arlet28torres@gmail.com</p>
                    </div>
                </div>

                <div className="quick-access flex flex-col gap-4 items-start">
                    <p className="uppercase text-sm font-semibold text-indigo-500">Síguenos en Redes</p>

                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Instagram width={16} className="text-slate-600" />
                        <FooterLink text="@hemis-ferios" />
                    </div>

                    <div className="flex flex-row gap-1 items-center justify-center">
                        <Facebook width={16} className="text-slate-600" />
                        <FooterLink text="Hemisferios" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;