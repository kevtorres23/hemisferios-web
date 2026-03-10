import { PatientType } from "@/utils/types";

function modalityFilter(array: PatientType[], cashStatus: boolean, cardStatus: boolean) {
    let filteredArray = array.filter((patient) => {
        return ((cashStatus ? patient.paymentModality === "cash" : false) ||
            (cardStatus ? patient.paymentModality === "card" : false));
    });

    return filteredArray;
}

function frequencyFilter(array: PatientType[], weeklyStatus: boolean, monthlyStatus: boolean) {
    let filteredArray = array.filter((patient) => {
        return ((weeklyStatus ? patient.paymentFrequency === "weekly" : false)) || (monthlyStatus ? patient.paymentFrequency === "monthly" : false);
    });

    return filteredArray
};

function applyPatientFilters(data: PatientType[], cashStatus: boolean, cardStatus: boolean, weeklyStatus: boolean, monthlyStatus: boolean) {
    let filter1 = modalityFilter(data, cashStatus, cardStatus);
    let filteredData = frequencyFilter(filter1, weeklyStatus, monthlyStatus);

    return filteredData;
}

export default applyPatientFilters;