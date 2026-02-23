"use client";

import { useState, useId } from "react";
import SystemLayout from "@/system/components/SystemLayout";
import PageTitle from "@/system/components/PageTitle";
import IconButton from "@/system/components/IconButton";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

function Statistics() {
    const id = useId();
    const [displayedMonth, setDisplayedMonth] = useState("Febrero");

    const recordMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
        <SystemLayout sidebarPage="therapists">

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Terapeutas" desc="Consulta un registro de los terapeutas que actualmente trabajan en el centro." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <Select defaultValue="01" value={displayedMonth} onValueChange={(val) => setDisplayedMonth(val)}>
                        <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                            <SelectGroup className="h-80 overflow-y-scroll">
                                <SelectLabel className="text-sm">Mes del registro:</SelectLabel>
                                {/* Map the available record months */}
                                {recordMonths.map((item, id) =>
                                    <SelectItem className="text-sm" key={id} value={item}>{item}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </ SystemLayout>
    );
};

export default Statistics;