import SectionBadge from "./SectionBadge";
import { Download, House } from "lucide-react";

type ReceiptProps = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
}

function Receipt(props: ReceiptProps) {
    return (
        <div className={`lg:max-w-lg w-full flex flex-col items-start border border-slate-200 bg-slate-50 rounded-xl gap-5 transition-opacity duration-700 ease-in`}>
            <div className="receipt-header w-full p-6 bg-indigo-500 flex flex-col gap-2 rounded-t-xl">
                <h1 className="text-xl tracking-tight font-semibold text-white">Comprobante de la Cita</h1>
                <p className="text-slate-100 font-normal">Generada el 14/01/2026, a las 10:45 a.m.</p>
            </div>

            <div className="patient-info fl flex flex-col gap-5 sm:px-6 px-4 w-full items-start">
                <SectionBadge name="INFORMACIÓN DEL PACIENTE" />

                <div className="data-row flex sm:flex-row flex-col md:items-center items-start justify-start gap-4 w-full">
                    <div className="info-block flex flex-col gap-3 w-1/2">
                        <p className="text-sm font-normal text-slate-500">
                            Nombre(s)
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.patientName}
                        </p>
                    </div>

                    <div className="info-block flex flex-col gap-3">
                        <p className="text-sm font-normal text-slate-500">
                            Apellido paterno
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.fatherSurname}
                        </p>
                    </div>
                </div>

                <div className="data-row flex sm:flex-row flex-col md:items-center items-start justify-start gap-4 w-full">
                    <div className="info-block flex flex-col gap-3 w-1/2">
                        <p className="text-sm font-normal text-slate-500">
                            Apellido materno
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.fatherSurname}
                        </p>
                    </div>

                    <div className="info-block flex flex-col gap-3">
                        <p className="text-sm font-normal text-slate-500">
                            Teléfono del adulto
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.phoneNumber}
                        </p>
                    </div>
                </div>
            </div>

            <div className="separation-line w-full bg-slate-200 h-px"></div>

            <div className="appointment-info flex flex-col gap-5 sm:px-6 px-4 pb-6 w-full items-start">
                <SectionBadge name="INFORMACIÓN DE LA CITA" />

                <div className="data-row flex sm:flex-row flex-col md:items-center items-start justify-start gap-4 w-full">
                    <div className="info-block flex flex-col gap-3 w-1/2">
                        <p className="text-sm font-normal text-slate-500">
                            Fecha
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            16 de febrero, 2026
                        </p>
                    </div>

                    <div className="info-block flex flex-col gap-3">
                        <p className="text-sm font-normal text-slate-500">
                            Hora
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            10:00 horas
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 items-start px-6 pb-6">
                <button className="bg-indigo-500 text-white w-full flex flex-row gap-2 items-center justify-center sm:text-base text-sm tracking-tight px-4 py-2 rounded-lg cursor-pointer font-normal border border-indigo-500 hover:bg-indigo-100">
                    <Download size={18} color="white"/>
                    Descargar en PDF
                </button>
                <button className="bg-white text-indigo-500 w-full flex flex-row gap-2 items-center justify-center tracking-tight sm:text-base text-sm px-4 py-2 rounded-lg cursor-pointer font-normal border border-indigo-500 hover:bg-indigo-100">
                    <House size={18}/>
                    Regresar al inicio
                </button>
            </div>
        </div>
    )
}

export default Receipt;