import Navbar from "@/website-components/Navbar"
import Footer from "@/website-components/Footer";
import WrittenMessage from "@/website-sections/contact/WrittenMessage";
import OtherChannels from "@/website-sections/contact/OtherChannels";
import LocationMap from "@/website-sections/contact/LocationMap";

function Contact() {
    return (
        <>
            <Navbar activePage="contact" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <WrittenMessage />

                <OtherChannels />

                <LocationMap />

                <Footer />
            </div>
        </>
    )
}

export default Contact;