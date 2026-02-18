import AppointmentCard from "./AppointmentCard";
import { AppointmentType } from "@/system/modules/Types";

type GridProps = {
    data: AppointmentType[];
}

function AppointmentGrid (props: GridProps) {
    return (
        <div className="grid w-full lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {props.data.map((item, id) => 
                <AppointmentCard key={id}
                    status={item.status}
                    patientName={item.patientName}
                    fatherSurname={item.fatherSurname}
                    motherSurname={item.motherSurname}
                    phoneNumber={item.phoneNumber}
                    date={item.date}
                    hour={item.hour}
                    timestamp={item.timestamp}
                />
            )}
        </div>
    );
};

export default AppointmentGrid;