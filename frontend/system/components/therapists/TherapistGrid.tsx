import SearchBar from "../SearchBar";
import { useState } from "react";
import PageNavigator from "../PageNavigator";
import { TherapistType } from "@/lib/Types";
import { useId } from "react";
import TherapistCard from "./TherapistCard";

type GridProps = {
    data: TherapistType[][]; // A list containing the pages of a list of patient objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TherapistGrid(props: GridProps) {
    const id = useId();
    const [pages, setPages] = useState(props.data?.length);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter variables.
    const [intervalValue, setIntervalValue] = useState("two-weeks");

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex sm:flex-row flex-col gap-2.5 sm:w-auto w-full items-center">
                    <div className="flex flex-row gap-2.5 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>

                        <PageNavigator labelText={`${currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                {props.data[currentPage - 1].map((item, id) =>
                    <TherapistCard
                        key={id}
                        name={item.name}
                        lastName={item.lastName}
                        startingDate={item.startingDate}
                        contactNumber={item.contactNumber}
                        schedule={item.schedule}
                    />
                )}
            </div>
        </div>
    );
};

export default TherapistGrid;