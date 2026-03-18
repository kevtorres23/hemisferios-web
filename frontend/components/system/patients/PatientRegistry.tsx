import { useState, useId, useEffect } from "react";
import { PatientRegistry, PatientType } from "@/utils/types";
import { compareAsc, format } from "date-fns"
import toast, { Toaster } from 'react-hot-toast';
import AddRegistry from "./AddRegistryForm";
import { X, CalendarArrowUp, CalendarArrowDown, Plus } from "lucide-react";
import NormalButton from "@/components/website/NormalButton";
import CancelButton from "../CancelButton";
import IconButton from "../IconButton";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import HistoryRegistry from "./HistoryRegistry";
import api from "@/lib/axios";
import { es } from "date-fns/locale";
import LoadingState from "../LoadingState";

type RegistryProps = {
    isVisible: boolean,
    patientId: string,
    btnType?: "button" | "submit";
    onClose: () => void // Function to close the modal.
};

function PatientRegistryModal(props: RegistryProps) {
    const date = new Date();

    const [orderFilter, setOrderFilter] = useState(true); // True for most recent - False for least recent.
    const [patientData, setPatientData] = useState<PatientType>();
    const [displayedMonth, setDisplayedMonth] = useState("3");
    const [displayedYear, setDisplayedYear] = useState(date.getFullYear().toString());
    const [registryModal, setRegistryModal] = useState(false);
    const [registry, setRegistry] = useState<PatientRegistry[]>([]);
    const [finished, setFinished] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const id = useId();

    useEffect(() => {
        const getPatientById = async () => {
            try {
                const res = await api.get("/patients/" + props.patientId);
                const patient: PatientType = res.data;
                const filteredRegistry = patient.visitRegistry.filter((registry) => {
                    return (Number(registry.date[5] + registry.date[6]) === Number(displayedMonth)) &&
                        (Number(registry.date[0] + registry.date[1] + registry.date[2] + registry.date[3]) === Number(displayedYear));
                });

                setRegistry(filteredRegistry);
                setPatientData(patient);
            } catch (error) {
                console.log("An error ocurred while fetching the registry:", error)
            } finally {
                setIsLoading(false);
            };
        };

        getPatientById();
    }, [displayedMonth, displayedYear, finished]);

    function onSaveRegistry() {
        setRegistryModal(false);
        setFinished(finished + 1);
        toast.success("Visita añadida.");
    }

    function onDeleteRegistry(id: string) {
        setRegistry((prev) => prev.filter((registry) => registry._id != id));
        toast.success("Visita eliminada.")
    }   

    const recordMonths = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const recordYears = ["2026", "2025"];

    return (
        <div className={`dark-background ${props.isVisible ? "absolute" : "hidden"} z-999 w-full h-screen top-0 left-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center`}>
            <div className="modal-window fixed flex flex-col bg-white sm:max-h-10/12 no-scrollbar overflow-y-scroll sm:h-auto h-full sm:rounded-lg rounded-none p-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] gap-5 max-w-xl w-full">
                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-xl tracking-tight font-semibold text-slate-800">Historial de citas de {patientData ? patientData.name : ""} {patientData ? patientData.fatherSurname : ""}</h1>

                    <X onClick={props.onClose} size={24} className="text-slate-600 cursor-pointer" />
                </div>

                {!registryModal && (
                    <div className="">
                        <IconButton onClick={() => setRegistryModal(true)} isActive={true} icon={<Plus size={18} />} text="Registrar una visita" />
                    </div>
                )}

                {registryModal && (
                    <div className="p-4 border border-slate-200 rounded-md flex flex-col gap-4 w-full">
                        <AddRegistry patientData={patientData} onSave={onSaveRegistry} />

                        <div className="buttons flex sm:flex-row flex-col w-full gap-4 items-center justify-end">
                            <div className="flex flex-col w-full">
                                <CancelButton onClick={() => setRegistryModal(false)} text="Cancelar" />
                            </div>

                            <div className="flex flex-col w-full">
                                <NormalButton type="submit" onClick={() => ""} text={"Guardar"} formId={"addRegistry"} />
                            </div>
                        </div>
                    </div>
                )}

                <Toaster />

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
                                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-4 px-3`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                                    <SelectGroup className="h-80 overflow-y-scroll">
                                        <SelectLabel className="text-sm">Mes del registro:</SelectLabel>
                                        {/* Map the available record months */}
                                        {recordMonths.map((item, id) => {
                                            return id === 0 ? "" : <SelectItem className="text-sm" key={id} value={id.toString()}>{item}</SelectItem>
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select value={displayedYear} onValueChange={(val) => setDisplayedYear(val)}>
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

                {isLoading && (
                    <LoadingState message="Cargando registros..." />
                )}

                {!isLoading && registry.length === 0 && (
                    <p className="text-base font-medium text-slate-800 w-full text-center">¡No hay registros en estas fechas!</p>
                )}

                {!isLoading && registry.length > 0 && (
                    registry.sort((registryA, registryB) => orderFilter ? 
                    compareAsc(registryA.date, registryB.date) : 
                    compareAsc(registryB.date, registryA.date)).map((item, id) => <HistoryRegistry onDeleteRegistry={() => onDeleteRegistry(item._id)} key={id} _id={item._id} patientId={props.patientId} date={format(new Date(item.date), "PPP", { locale: es })} hour={item.hour} />)
                )}
            </div>
        </div>
    );
};

export default PatientRegistryModal;