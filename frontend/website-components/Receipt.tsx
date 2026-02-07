import SectionBadge from "./SectionBadge";
import { Download, House } from "lucide-react";
import Link from "next/link";
import { Clock4 } from "lucide-react";
import Image from "next/image";
import whiteLogo from "../public/white-logo.png";import dynamic from "next/dynamic";
import PrintableReceipt from "@/website-modules/PDFHandling/PDFGenerator";

type ReceiptProps = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    creationDate: string;
    creationTime: string;
}

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    },
);

function Receipt(props: ReceiptProps) {
    const documentName = "Hemisferios Cita " + props.creationDate;

    return (
        <div className={`lg:max-w-lg w-full flex flex-col items-start border border-slate-200 bg-slate-50 rounded-xl gap-5 transition-opacity duration-700 ease-in`}>
            <div className="receipt-header w-full p-6 bg-indigo-500 flex flex-col gap-2 rounded-t-xl">
                <Image src={whiteLogo} alt="Centro Terapéutico Hemisferios" className="w-28" />
                <h1 className="text-2xl tracking-tight font-semibold text-white">Comprobante de Cita</h1>
                <div className="flex flex-col gap-3 items-start">
                    <div className="flex flex-row sm:gap-1 gap-0.5 sm:items-center items-start">
                        <Clock4 size={18} color="white" className="sm:block hidden sm:mt-0 mt-0.5" />
                        <p className="text-slate-100 text-wrap font-normal text-base">Generada el {props.creationDate}, a las {props.creationTime}</p>
                    </div>
                </div>
            </div>

            <div className="patient-info fl flex flex-col gap-5 sm:px-6 px-4 w-full items-start">
                <SectionBadge name="INFORMACIÓN DEL PACIENTE" />

                <div className="data-row flex sm:flex-row flex-col md:items-center items-start justify-start gap-4 w-full">
                    <div className="info-block flex flex-col gap-1 w-1/2">
                        <p className="text-sm font-normal text-slate-500">
                            Nombre(s)
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.patientName}
                        </p>
                    </div>

                    <div className="info-block flex flex-col gap-1">
                        <p className="text-sm font-normal text-slate-500">
                            Apellido paterno
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.fatherSurname}
                        </p>
                    </div>
                </div>

                <div className="data-row flex sm:flex-row flex-col md:items-center items-start justify-start gap-4 w-full">
                    <div className="info-block flex flex-col gap-1 w-1/2">
                        <p className="text-sm font-normal text-slate-500">
                            Apellido materno
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            {props.fatherSurname}
                        </p>
                    </div>

                    <div className="info-block flex flex-col gap-1">
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
                    <div className="info-block flex flex-col gap-1 w-1/2">
                        <p className="text-sm font-normal text-slate-500">
                            Fecha
                        </p>

                        <p className="text-sm font-normal text-slate-900">
                            16 de febrero, 2026
                        </p>
                    </div>

                    <div className="info-block flex flex-col gap-1">
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
                <PDFDownloadLink className="w-full" document={<PrintableReceipt
                    patientName={props.patientName}
                    fatherSurname={props.fatherSurname}
                    motherSurname={props.motherSurname}
                    phoneNumber={props.phoneNumber}
                    date={props.date}
                    hour={props.hour}
                    creationDate={props.creationDate}
                    creationTime={props.creationTime}
                />
                } fileName={documentName}>
                    <button className="bg-indigo-500 text-white w-full flex flex-row gap-2 items-center justify-center sm:text-base text-sm tracking-tight px-4 py-2 rounded-lg cursor-pointer font-normal border border-indigo-500 hover:bg-indigo-400">
                        <Download size={18} color="white" />
                        Descargar en PDF
                    </button>
                </PDFDownloadLink>
                <Link href={"/"} className="w-full">
                    <button className="bg-white text-indigo-500 w-full flex flex-row gap-2 items-center justify-center tracking-tight sm:text-base text-sm px-4 py-2 rounded-lg cursor-pointer font-normal border border-indigo-500 hover:bg-indigo-100">
                        <House size={18} />
                        Regresar al inicio
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Receipt;