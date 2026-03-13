import SearchBar from "../SearchBar";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import FilterDropdown from "./FilterDropdown";
import PageNavigator from "../PageNavigator";
import { PatientType } from "@/utils/types";
import EmptyState from "../EmptyState";
import { pageSeparator } from "@/utils/system/page-separator";
import patientsEmpty from "../../../public/patients-empty.png";
import applyPatientFilters from "@/utils/system/patients/payment-filter";

type GridProps = {
    data: PatientType[]; // A list containing the pages of a list of patient objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onActionSelected: (action: string) => void;
};

function PatientGrid(props: GridProps) {
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(props.data.length === 0 ? 0 : 1);
    const [search, setSearch] = useState("");
    // Filter variables.
    const [cashChecked, setCashChecked] = useState(true);
    const [cardChecked, setCardChecked] = useState(true);
    const [monthlyChecked, setMonthlyChecked] = useState(true);
    const [weeklyChecked, setWeeklyChecked] = useState(true);

    let patientData = props.data;
    const [patientPages, setPatientPages] = useState<any[][]>(pageSeparator(patientData))

    useEffect(() => {
        let filteredData: PatientType[] = applyPatientFilters(props.data, cashChecked, cardChecked, weeklyChecked, monthlyChecked);

        setPatientPages(pageSeparator(filteredData));
        setPages(pageSeparator(filteredData).length);

        if (pageSeparator(filteredData).length === 0) {
            setCurrentPage(1);
        };

        if (currentPage === 0 || (pageSeparator(filteredData).length) === 0) {
            setCurrentPage(1);
        }

        if (currentPage > pageSeparator(filteredData).length) {
            setCurrentPage(currentPage - 1);
        };

    }, [cashChecked, cardChecked, monthlyChecked, weeklyChecked, props.data]);

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={(e) => setSearch(e.target.value)} placeholder="Buscar cita por nombre del paciente" />
                <div className="filters flex sm:flex-row flex-col gap-2.5 sm:w-auto w-full items-center">
                    <p className="text-sm font-medium text-slate-500">Filtrar por pago:</p>

                    <FilterDropdown
                        onCardChange={(value: boolean) => setCardChecked(value)}
                        onCashChange={(value: boolean) => setCashChecked(value)}
                        onWeeklyChange={(value: boolean) => setWeeklyChecked(value)}
                        onMonthlyChange={(value: boolean) => setMonthlyChecked(value)}
                    />

                    <div className="flex flex-row gap-2.5 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>

                        <PageNavigator labelText={`${pages === 0 ? 0 : currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            {patientPages.length === 0 && (
                <EmptyState
                    header="¡No hay pacientes registrados aún!"
                    desc="Intenta modificar los filtros para ver algo de información."
                    image={patientsEmpty}
                />
            )}

            {patientPages.length >= 1 && (
                <>
                    <p className="text-slate-800 font-medium text-xl">Hay <span className="font-semibold text-indigo-500">{props.data.length}</span> pacientes registrados</p>

                    <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                        {patientPages[currentPage - 1].filter((item: PatientType) => {
                            return search.toLowerCase() === ""
                                ? item
                                : item.name.toLowerCase().includes(search.toLowerCase());
                        }).map((item, id) =>
                            <PatientCard
                                _id={item._id}
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
                </>
            )}
        </div>
    );
};

export default PatientGrid;