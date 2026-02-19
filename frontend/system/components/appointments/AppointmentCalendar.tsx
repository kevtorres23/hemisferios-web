"use client";

import { useState } from "react";
import PageNavigator from "../PageNavigator";
import OptionCheckbox from "../OptionCheckbox";
import { ChartBarBig } from "lucide-react";
import AppointmentTag from "./AppointmentTag";
import { AppointmentType } from "@/system/modules/Types";
import { CalendarDay, CalendarHour, CalendarSpace, CalendarUI } from "../CalendarElements";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type CalendarProps = {
    data: AppointmentType[];
};

function AppointmentCalendar(props: CalendarProps) {
    // State variables.
    const [finishedChecked, setFinishedChecked] = useState(true);
    const [firstDay, setFirstDay] = useState(16);
    const [pendingChecked, setPendingChecked] = useState(true);
    const [cancelledChecked, setCancelledChecked] = useState(true);
    const [numberOfWeeks, setNumberOfWeeks] = useState(2);
    const [week, setWeek] = useState(1); // 1 for current, 2 for next.

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <div className="flex sm:flex-row flex-col gap-3 items-center justify-center">
                    <PageNavigator
                        onPreviousClick={() => setWeek(1)}
                        onNextClick={() => setWeek(2)}
                        labelText="Semana actual"
                        currentPage={week}
                        finalPage={numberOfWeeks}
                        labelStyles="text-2xl font-medium text-slate-900 tracking-tight"
                    />

                    <div className="week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm">
                        <p className="text-sm text-indigo-500 font-medium">09/02 - 14/02</p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="" variant="outline">
                            <ChartBarBig size={14} />
                            Todos los estados
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="min-w-45 flex flex-col max-h-90">
                        {/* Estado */}
                        <DropdownMenuGroup className="flex flex-col gap-4 p-2.5">
                            <DropdownMenuLabel className="text-slate-600 font-normal p-0">
                                Estado(s):
                            </DropdownMenuLabel>
                            <div className="option-row flex flex-col gap-2">
                                <OptionCheckbox
                                    checked={pendingChecked}
                                    onCheckedChange={() => setPendingChecked(!pendingChecked)}
                                    item={<AppointmentTag type="pending" />}
                                />
                                <OptionCheckbox
                                    checked={finishedChecked}
                                    onCheckedChange={() => setFinishedChecked(!finishedChecked)}
                                    item={<AppointmentTag type="finished" />}
                                />
                                <OptionCheckbox
                                    checked={cancelledChecked}
                                    onCheckedChange={() => setCancelledChecked(!cancelledChecked)}
                                    item={<AppointmentTag type="cancelled" />}
                                />
                            </div>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <CalendarUI data={props.data} />


        </div>
    );
}

export default AppointmentCalendar;
