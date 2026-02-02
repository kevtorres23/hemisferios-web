"use client";

import Navbar from "@/website-components/Navbar"
import Footer from "@/website-components/Footer";
import AppointmentCreation from "@/website-sections/book-appointment/AppointmentCreation";

function BookAppointment() {
    return (
        <>
            <Navbar activePage="none" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <AppointmentCreation/>

                <Footer />
            </div>
        </>
    )
}

export default BookAppointment;