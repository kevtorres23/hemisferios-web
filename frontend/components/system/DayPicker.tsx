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
import { ChevronDownIcon, CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale";

type CalendarProps = {
    onSelectDate: (date: Date) => void;
};

export function DayPicker(props: CalendarProps) {
    const [date, setDate] = React.useState<Date | undefined>();

    const handleDateSelect = (date: Date) => {
        setDate(date);

        props.onSelectDate(date);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    data-empty={!date}
                    className="p-4 gap-1.5! text-white! rounded-50 justify-between items-center cursor-pointer data-[empty=true]:text-muted-foreground"
                >
                    <CalendarIcon size={18} strokeWidth={2.5} />
                    Calendario
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