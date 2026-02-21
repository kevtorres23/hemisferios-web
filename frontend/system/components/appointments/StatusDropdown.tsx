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

type DropdownProps = {
    isOnHistory: boolean;
};

function StatusDropdown(props: DropdownProps) {
    const [finishedChecked, setFinishedChecked] = useState(true);
    const [pendingChecked, setPendingChecked] = useState(true);
    const [cancelledChecked, setCancelledChecked] = useState(true);

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
                        {props.isOnHistory === false && (
                            <OptionCheckbox
                                checked={pendingChecked}
                                onCheckedChange={() => setPendingChecked(!pendingChecked)}
                                item={<AppointmentTag type="pending" />}
                            />
                        )}
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
    );
};

export default StatusDropdown;