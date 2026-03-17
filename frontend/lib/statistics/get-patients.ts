import { PatientType } from "@/utils/types";
import api from "../axios";

async function getAllPatients() {
    const res = await api.get("/patients");
    const patients: PatientType[] = res.data;
    return patients;
};

export { getAllPatients };