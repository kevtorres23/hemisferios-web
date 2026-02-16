import SearchBar from "../SearchBar";
import AppointmentGrid from "./AppointmentGrid";
import { AppointmentType } from "../../modules/Types";

type ContainerProps = {
    filter?: React.ReactElement;
    pageNavigator?: React.ReactElement;
    contentType: string;
    data: AppointmentType[];
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AppointmentContainer(props: ContainerProps) {
    return (
        <div className="w-hull flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex md:flex-row flex-col items-center justify-between">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex flex-row gap-2">
                    {props.filter}
                    {props.pageNavigator}
                </div>
            </div>

            {props.contentType === "cards" && (
                <AppointmentGrid data={props.data} />
            )}
        </div>
    )
}

export default AppointmentContainer;