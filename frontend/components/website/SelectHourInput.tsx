import { useId, useEffect, useState } from "react";
import { Clock4 } from "lucide-react";
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { formatAvailability } from "@/utils/website/format-availability";
import { DayFormat } from "@/utils/types";
import api from "@/lib/axios";

type SelectProps = {
    label: string;
    isOnModify: boolean | undefined;
    date: string;
    appointmentId: string;
    value: string;
    onInputChange: (val: string) => void;
    activeValidation: boolean;
};

function SelectHourInput(props: SelectProps) {
    const id = useId();
    const [availableHours, setAvailableHours] = useState<string[]>();

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                // Variable definition.
                const appointmentInfo = await api.get("/appointments/" + props.appointmentId);
                const appointmentDate = props.isOnModify ? appointmentInfo.data.date : props.date;
                const availability = await api.get("/availability"); // Getting availability from the backend.
                const formattedAvailability = formatAvailability(availability.data);

                // Update hour availability based on the selected day.
                formattedAvailability.forEach((dayList: DayFormat[]) => {
                    dayList.forEach((day) => {
                        if (day.databaseDate === appointmentDate) {
                            setAvailableHours(day.hours);
                        };
                    });
                });
            } catch (error) {
                console.log("Error fetching availability", error);
            };

        };

        fetchAvailability();
    }, [props.date]);

    return (
        <div className='w-full space-y-2'>
            <Label className="text-slate-500 font-normal sm:text-sm text-base" htmlFor={id}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
            <Select value={props.value} onValueChange={(val) => props.onInputChange(val)}>
                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3 ${props.activeValidation ? "border border-red-500" : ""}`}>
                    <SelectValue className="" placeholder={
                        <div className="flex flex-row gap-2 items-center">
                            <Clock4 size={16} />
                            <p className="sm:text-sm text-base">Selecciona una hora</p>
                        </div>
                    } />
                </SelectTrigger>
                <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                    <SelectGroup className="h-80 overflow-y-scroll">
                        <SelectLabel className="text-sm">Hora de la cita</SelectLabel>
                        {/* Map the available hours from the database*/}
                        {availableHours?.map((hour, id) =>
                            <SelectItem className="text-sm" key={id} value={hour}>{hour}</SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectHourInput;
