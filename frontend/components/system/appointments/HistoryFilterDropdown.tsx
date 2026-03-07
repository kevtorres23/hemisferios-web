"use client";

import { useState } from "react";
import { ChartBarBig } from "lucide-react";
import AppointmentTag from "./AppointmentTag";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import OptionCheckbox from "../OptionCheckbox";
import { useHistoryFilters } from "@/utils/system/history/filter-store";

type Status = {
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void,
    updateStatus: (statusObject: Status) => void,
};

function HistoryFilterDropdown() {
    const [finishedChecked, setFinishedChecked] = useState(true);
    const [cancelledChecked, setCancelledChecked] = useState(true);

    // Store variables (Zustand).
    const updateStatus = useHistoryFilters((state: FilterStore) => state.updateStatus);

    function onFinishedChange() {
        setFinishedChecked(!finishedChecked);

        const updatedObject = {
            finished: !finishedChecked,
            cancelled: cancelledChecked
        };

        updateStatus(updatedObject);
    };

    function onCancelledChange() {
        setCancelledChecked(!cancelledChecked);

        const updatedObject = {
            finished: finishedChecked,
            cancelled: !cancelledChecked
        };

        updateStatus(updatedObject);
    };

    return (
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
                            checked={finishedChecked}
                            onCheckedChange={onFinishedChange}
                            item={<AppointmentTag type="finished" />}
                        />
                        <OptionCheckbox
                            checked={cancelledChecked}
                            onCheckedChange={onCancelledChange}
                            item={<AppointmentTag type="cancelled" />}
                        />
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default HistoryFilterDropdown;