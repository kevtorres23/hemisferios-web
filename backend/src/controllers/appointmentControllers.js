export function getAllAppointments(req, res) {
    res.status(200).send("Appointments fetched correctly.");
};

export function createAppointment(req, res) {
    res.status(200).json({ message: "Appointment created successfully." });
};

export function updateAppointment(req, res) {
    res.status(200).json({ message: "Appointment updated successfully." });
};

export function deleteAppointment(req, res) {
    res.status(200).json({ message: "Appointment deleted successfully." });
}