"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { es } from "date-fns/locale";

type CalendarProps = {
    onSelectDate: (date: Date) => void;
};

export function SelectStartingDate(props: CalendarProps) {
    const [date, setDate] = React.useState<Date>()

    const handleDateSelect = (date: Date) => {
        setDate(date);

        props.onSelectDate(date);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-full py-5! justify-between cursor-pointer text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                    {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-999" align="start">
                <Calendar
                    locale={es}
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    defaultMonth={date}
                    required={true}
                />
            </PopoverContent>
        </Popover>
    );
};