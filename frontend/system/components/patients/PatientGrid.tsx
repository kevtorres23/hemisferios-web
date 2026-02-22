import SearchBar from "../SearchBar";
import { useState } from "react";
import PatientCard from "./PatientCard";
import FilterDropdown from "../appointments/FilterDropdown";
import PageNavigator from "../PageNavigator";
import { PatientType } from "@/system/modules/Types";

type GridProps = {
    data: PatientType[][]; // A list containing the pages of a list of patient objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onActionSelected: (action: string) => void;
}

function PatientGrid(props: GridProps) {
    const [pages, setPages] = useState(props.data?.length);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter variables.
    const [intervalValue, setIntervalValue] = useState("two-weeks");

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex sm:flex-row flex-col gap-5 sm:w-auto w-full">
                    {/* Dropdown del tipo de pago */}

                    <div className="flex flex-row gap-3 items-center justify-center">
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
                        onActionSelected={() => ""}
                    />
                )}
            </div>
        </div>
    );
};

export default PatientGrid;