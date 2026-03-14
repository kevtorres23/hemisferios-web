import api from "../axios";

async function getstatusCount(status: "pending" | "finished" | "cancelled") {
    try {
        const res = await api.get("/appointments/byStatus/" + status);
        const appointments = res.data;
        return appointments.length;
    } catch (error) {
        console.log("An error ocurred while fetching the appointments:", error);
    };
};

export { getstatusCount };