import SearchBar from "../SearchBar";
import AppointmentGrid from "./AppointmentGrid";
import { AppointmentType } from "../../modules/Types";
import PageNavigator from "../PageNavigator";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";

type ContainerProps = {
    contentType: string;
    data: AppointmentType[][]; // A list of a list of appointment objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AppointmentContainer(props: ContainerProps) {
    const [pages, setPages] = useState(props.data.length);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter variables.
    const [intervalValue, setIntervalValue] = useState("two-weeks");

    function onIntervalChange(val: string) {
        setIntervalValue(val);
    }

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex sm:flex-row flex-col gap-5 sm:w-auto w-full">
                    <FilterDropdown intervalValue={intervalValue} onIntervalChange={onIntervalChange} />

                    <PageNavigator onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                </div>
            </div>

            {props.contentType === "cards" && (
                <AppointmentGrid data={props.data[currentPage - 1]} />
            )}
        </div>
    )
}

export default AppointmentContainer;