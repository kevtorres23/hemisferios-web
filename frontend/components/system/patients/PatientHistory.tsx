import { useState, useId } from "react";
import { PatientHistory } from "@/utils/types";
import { X, CalendarArrowUp, CalendarArrowDown } from "lucide-react";
import IconButton from "../IconButton";
import HistoryRegistry from "./HistoryRegistry";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

type HistoryProps = {
    isVisible: boolean,
    btnType?: "button" | "submit";
    onClose: () => void // Function to close the modal.
    historyData: PatientHistory[];
};

function PatientHistoryModal(props: HistoryProps) {
    const [orderFilter, setOrderFilter] = useState(true); // True for most recent - False for least recent.
    const [displayedMonth, setDisplayedMonth] = useState("Febrero");
    const [displayedYear, setDisplayedYear] = useState("2026");
    const id = useId();

    const recordMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const recordYears = ["2026", "2025"];

    return (
        <div className={`dark-background ${props.isVisible ? "absolute" : "hidden"} z-999 w-full h-screen top-0 left-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center`}>
            <div className="modal-window fixed flex flex-col bg-white sm:max-h-10/12 no-scrollbar overflow-y-scroll sm:h-auto h-full sm:rounded-lg rounded-none p-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] gap-5 max-w-xl w-full">
                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-xl tracking-tight font-semibold text-slate-800">Historial de Citas del Paciente</h1>

                    <X onClick={props.onClose} size={24} className="text-slate-600" />
                </div>

                <div className="filters w-full flex md:flex-row flex-col gap-3 bg-slate-50 border p-4 border-slate-200 rounded-md">
                    <div className="flex flex-col gap-2 w-auto">
                        <p className="text-semibold text-slate-400 text-sm">Orden:</p>

                        <IconButton
                            onClick={() => setOrderFilter(!orderFilter)}
                            icon={orderFilter === true ? <CalendarArrowUp size={16} /> : <CalendarArrowDown size={16} />}
                            text={orderFilter === true ? "Más recientes" : "Más lejanas"}
                            isActive={false}
                        />
                    </div>

                    <div className="divisory-line h-full w-1 bg-slate-200 md:flex hidden"></div>

                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-medium text-slate-400 text-sm">Mes y año:</p>

                        <div className="flex flex-row gap-2 items-center justify-center">
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

                            <Select defaultValue="01" value={displayedYear} onValueChange={(val) => setDisplayedYear(val)}>
                                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-2 px-3`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                                    <SelectGroup className="h-80 overflow-y-scroll">
                                        <SelectLabel className="text-sm">Año del registro:</SelectLabel>
                                        {/* Map the available record months */}
                                        {recordYears.map((item, id) =>
                                            <SelectItem className="text-sm" key={id} value={item}>{item}</SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                
                {props.historyData.map((item, id) => 
                    <HistoryRegistry key={id} date={item.date} hour={item.hour}/>
                )}
            </div>
        </div>
    );
};

export default PatientHistoryModal;