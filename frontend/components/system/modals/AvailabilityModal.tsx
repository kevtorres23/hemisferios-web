import MediumModal from "./MediumModal";
import React from "react";
import type { Option } from '@/components/ui/multi-select';
import { currentInterval, nextInterval, currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables";
import api from "@/lib/axios";
import getAvailabilityByGropus from "@/lib/availability/get-grouped-availability";
import { ModalProps } from "@/utils/types";
import { ArrowRight, ArrowLeft } from "lucide-react";
import MultiSelect from "../MultiSelect";
import { useState, useEffect } from "react";
import { Availability } from "@/utils/types";
import { hourSorter } from "@/utils/system/calendar/calendar-methods";
import toast, { Toaster } from 'react-hot-toast';

function getValues(list: Option[]) {
    const valueList: string[] = [];

    list.forEach((hour) => {
        valueList.push(hour.value);
    });

    return hourSorter(valueList); // We finally return the hour list, but sorted in ascending order.
};

function AvailabilityModal(props: ModalProps) {
    const [week, setWeek] = useState<"current" | "next">("current");

    // Current week values.
    const [currentMonday, setCurrentMonday] = useState<Option[]>([]);
    const [currentTuesday, setCurrentTuesday] = useState<Option[]>([]);
    const [currentWednesday, setCurrentWednesday] = useState<Option[]>([]);
    const [currentThursday, setCurrentThursday] = useState<Option[]>([]);
    const [currentFriday, setCurrentFriday] = useState<Option[]>([]);
    const [currentSaturday, setCurrentSaturday] = useState<Option[]>([]);

    // Next week values.
    const [nextMonday, setNextMonday] = useState<Option[]>([]);
    const [nextTuesday, setNextTuesday] = useState<Option[]>([]);
    const [nextWednesday, setNextWednesday] = useState<Option[]>([]);
    const [nextThursday, setNextThursday] = useState<Option[]>([]);
    const [nextFriday, setNextFriday] = useState<Option[]>([]);
    const [nextSaturday, setNextSaturday] = useState<Option[]>([]);

    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        getAvailabilityByGropus().then((groups) => {
            // Current week's days.
            setCurrentMonday(groups[0]);
            setCurrentTuesday(groups[1]);
            setCurrentWednesday(groups[2]);
            setCurrentThursday(groups[3]);
            setCurrentFriday(groups[4]);
            setCurrentSaturday(groups[5]);

            // Next week's days.
            setNextMonday(groups[6]);
            setNextTuesday(groups[7]);
            setNextWednesday(groups[8]);
            setNextThursday(groups[9]);
            setNextFriday(groups[10]);
            setNextSaturday(groups[11]);
        })
    }, [])

    async function onSubmitAvailability(e: React.FormEvent) {
        console.log("submited");
        e.preventDefault();

        if ((currentMonday.length === 0) || (currentTuesday.length === 0) || (currentWednesday.length === 0) || (currentThursday.length === 0) || (currentFriday.length === 0) || (currentSaturday.length === 0) ||
            (nextMonday.length === 0) || (nextTuesday.length === 0) || (nextWednesday.length === 0) || (nextThursday.length === 0) || (nextFriday.length === 0) || (nextSaturday.length === 0)) {
            setIsEmpty(true);
            toast.error("Ningún campo de disponibilidad puede quedarse vacío.", { duration: 3500 });
        } else {
            setIsEmpty(false);
            e.preventDefault();

            const newCurrentAvailability: Availability = {
                lunes: getValues(currentMonday),
                martes: getValues(currentTuesday),
                miercoles: getValues(currentWednesday),
                jueves: getValues(currentThursday),
                viernes: getValues(currentFriday),
                sabado: getValues(currentSaturday)
            };

            const newNextAvailability: Availability = {
                lunes: getValues(nextMonday),
                martes: getValues(nextTuesday),
                miercoles: getValues(nextWednesday),
                jueves: getValues(nextThursday),
                viernes: getValues(nextFriday),
                sabado: getValues(nextSaturday)
            };

            try {
                await api.put("/availability/69a23c8f198727d79195f3f9", newCurrentAvailability);
                await api.put("/availability/69a23cb0198727d79195f3fd", newNextAvailability);

            } catch (error) {
                console.log("An error happened while updating the availability:", error)
            } finally {
                props.onSave();
            };
        };
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="availabilityForm"
            onClose={props.onClose}
            title="Editar disponibilidad de citas"
            confirmationBtnText="Guardar"
        >
            <Toaster />

            <p className="text-base text-slate-500 font-normal w-full">
                Las horas que selecciones serán las que las personas puedan seleccionar cuando intenten agendar una cita en la página web.
            </p>

            <div className="flex flex-row items-center justify-center gap-1 week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm self-start">
                {week === "current" ? (
                    <>
                        <p className="text-sm text-indigo-500 font-medium">Semana actual
                            ({currentInterval.firstValue.day} de {currentInterval.firstValue.month} al {currentInterval.secondValue.day} de {currentInterval.secondValue.month})
                        </p>
                        <ArrowRight size={16} strokeWidth={2.5} className="cursor-pointer text-indigo-500" onClick={() => setWeek("next")} />
                    </>
                ) : (
                    <>
                        <ArrowLeft size={16} strokeWidth={2.5} className="cursor-pointer text-indigo-500" onClick={() => setWeek("current")} />
                        <p className="text-sm text-indigo-500 font-medium">Semana próxima
                            ({nextInterval.firstValue.day} de {nextInterval.firstValue.month} al {nextInterval.secondValue.day} de {nextInterval.secondValue.month})
                        </p>
                    </>
                )}
            </div>

            <form id="availabilityForm" onSubmit={(e: React.FormEvent) => onSubmitAvailability(e)} className="">
                {week === "current" && (
                    <div className="flex flex-col sm:gap-10 gap-6 w-full">
                        <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start justify-center w-full">

                            <MultiSelect value={currentMonday} onChange={setCurrentMonday} label={`Lunes ${currentWeekList[0].dayNum.number}`} isEmpty={(currentMonday.length === 0) && (isEmpty)} />

                            <MultiSelect value={currentTuesday} onChange={setCurrentTuesday} label={`Martes ${currentWeekList[1].dayNum.number}`} isEmpty={(currentTuesday.length === 0) && (isEmpty)} />
                        </div>

                        <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start justify-center w-full">
                            <MultiSelect value={currentWednesday} onChange={setCurrentWednesday} label={`Miércoles ${currentWeekList[2].dayNum.number}`} isEmpty={(currentWednesday.length === 0) && (isEmpty)} />

                            <MultiSelect value={currentThursday} onChange={setCurrentThursday} label={`Jueves ${currentWeekList[3].dayNum.number}`} isEmpty={(currentThursday.length === 0) && (isEmpty)} />
                        </div>

                        <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start h-full justify-center w-full">
                            <MultiSelect value={currentFriday} onChange={setCurrentFriday} label={`Viernes ${currentWeekList[4].dayNum.number}`} isEmpty={(currentFriday.length === 0) && (isEmpty)} />

                            <MultiSelect value={currentSaturday} onChange={setCurrentSaturday} label={`Sábado ${currentWeekList[5].dayNum.number}`} isEmpty={(currentSaturday.length === 0) && (isEmpty)} />
                        </div>
                    </div>
                )}

                {week === "next" && (
                    <div className="flex flex-col sm:gap-10 gap-6 w-full">
                        <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start justify-center w-full">
                            <MultiSelect value={nextMonday} onChange={setNextMonday} label={`Lunes ${nextWeekList[0].dayNum.number}`} isEmpty={(nextMonday.length === 0) && (isEmpty)} />

                            <MultiSelect value={nextTuesday} onChange={setNextTuesday} label={`Martes ${nextWeekList[1].dayNum.number}`} isEmpty={(nextTuesday.length === 0) && (isEmpty)} />
                        </div>

                        <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start justify-center w-full">
                            <MultiSelect value={nextWednesday} onChange={setNextWednesday} label={`Miércoles ${nextWeekList[2].dayNum.number}`} isEmpty={(nextWednesday.length === 0) && (isEmpty)} />

                            <MultiSelect value={nextThursday} onChange={setNextThursday} label={`Jueves ${nextWeekList[3].dayNum.number}`} isEmpty={(nextThursday.length === 0) && (isEmpty)} />
                        </div>

                        <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start h-full justify-center w-full">
                            <MultiSelect value={nextFriday} onChange={setNextFriday} label={`Viernes ${nextWeekList[4].dayNum.number}`} isEmpty={(nextFriday.length === 0) && (isEmpty)} />

                            <MultiSelect value={nextSaturday} onChange={setNextSaturday} label={`Sábado ${nextWeekList[5].dayNum.number}`} isEmpty={(nextSaturday.length === 0) && (isEmpty)} />
                        </div>
                    </div>
                )}

            </form>
        </MediumModal>
    );
};

export default AvailabilityModal;