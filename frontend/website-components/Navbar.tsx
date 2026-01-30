"use client";

import Link from "next/link";
import NormalButton from "./NormalButton";
import NavbarLink from "./NavbarLink";
import Image from "next/image";
import Logo from "../public/hemisferios-logo.png";
import React, { useState } from "react";
import { Menu } from "lucide-react";

type NavbarProps = {
    activePage: "home" | "services" | "about-us" | "contact";
}

function Navbar(props: NavbarProps) {
    let currentPage = props.activePage;
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <div className="sticky z-999 top-0 w-full bg-white flex flex-col gap-6 border-b border-slate-200 py-4 md:px-16 px-8">
            <div className="w-full justify-between items-center flex flex-row">
                <Image src={Logo} alt="Logo" className="sm:w-42 w-32 h-auto" />

                {/* Links visible for >=1024px screen width */}
                <div className="links-container lg:flex hidden flex-row gap-8 w-auto items-center justify-center">
                    <Link href="/">
                        <NavbarLink text="Inicio" active={currentPage === "home" ? true : false} />
                    </Link>

                    <Link href="services-and-prices">
                        <NavbarLink text="Servicios y precios" active={currentPage === "services" ? true : false} />
                    </Link>

                    <Link href="about-us">
                        <NavbarLink text="Sobre nosotros" active={currentPage === "about-us" ? true : false} />
                    </Link>

                    <Link href="contact">
                        <NavbarLink text="Contacto" active={currentPage === "contact" ? true : false} />
                    </Link>
                </div>

                {/* Right container with the "Create an appointment" and collapsible menu buttons */}
                <div className="flex flex-row gap-4 items-center justify-center">
                    <div className="sm:block hidden">
                        <NormalButton text="Agendar una cita" />
                    </div>
                    <button onClick={toggleOpen} className="bg-slate-100 border-2 border-slate-200 p-2.5 rounded-lg lg:hidden block text-slate-500">
                        <Menu />
                    </button>
                </div>
            </div>

            {/* Collapsable menu for smaller screen sizes */}
            {open && (
                <div className="w-full flex flex-col gap-4 bg-slate-100 border border-slate-200 p-4 rounded-lg">
                    <Link href="/">
                        <NavbarLink text="Inicio" active={currentPage === "home" ? true : false} />
                    </Link>

                    <Link href="services-and-prices">
                        <NavbarLink text="Servicios y precios" active={currentPage === "services" ? true : false} />
                    </Link>

                    <Link href="about-us">
                        <NavbarLink text="Sobre nosotros" active={currentPage === "about-us" ? true : false} />
                    </Link>

                    <Link href="contact">
                        <NavbarLink text="Contacto" active={currentPage === "contact" ? true : false} />
                    </Link>

                    <div className="sm:hidden block">
                        <NormalButton text="Agendar una cita" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;