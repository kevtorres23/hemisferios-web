import SearchBar from "../SearchBar";
import { useState } from "react";
import PatientCard from "./PatientCard";
import { HandCoins } from "lucide-react";
import FilterDropdown from "../appointments/FilterDropdown";
import PageNavigator from "../PageNavigator";
import { PatientType } from "@/utils/types";
import { useId } from "react";
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

type GridProps = {
    data: PatientType[][]; // A list containing the pages of a list of patient objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onActionSelected: (action: string) => void;
}

function PatientGrid(props: GridProps) {
    const id = useId();
    const [pages, setPages] = useState(props.data?.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentOption, setPaymentOption] = useState("");

    // Filter variables.
    const [intervalValue, setIntervalValue] = useState("two-weeks");

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex sm:flex-row flex-col gap-2.5 sm:w-auto w-full items-center">
                    <p className="text-sm font-medium text-slate-500">Filtrar por pago:</p>

                    <div className='space-y-2'>
                        <Select defaultValue="todos" value={paymentOption} onValueChange={(val) => setPaymentOption(val)}>
                            <SelectTrigger id={id} className={`bg-white sm:text-sm text-base cursor-pointer py-5 px-3`}>
                                <SelectValue defaultValue="todos" className="" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                                <SelectGroup className="">
                                    <SelectLabel className="text-sm">Hora de la cita</SelectLabel>
                                    <SelectItem className="text-sm" value="todos">Todo tipo</SelectItem>
                                    <SelectItem className="text-sm" value="tarjeta">Tarjeta</SelectItem>
                                    <SelectItem className="text-sm" value="efectivo">Efectivo</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-row gap-2.5 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>

                        <PageNavigator labelText={`${currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                {props.data[currentPage - 1].map((item, id) =>
                    <PatientCard
                        key={id}
                        name={item.name}
                        fatherSurname={item.fatherSurname}
                        motherSurname={item.motherSurname}
                        adultName={item.adultName}
                        contactNumber={item.contactNumber}
                        startingDate={item.startingDate}
                        paymentFrequency={item.paymentFrequency}
                        paymentModality={item.paymentModality}
                        appointmentHistory={item.appointmentHistory}
                    />
                )}
            </div>
        </div>
    );
};

export default PatientGrid;