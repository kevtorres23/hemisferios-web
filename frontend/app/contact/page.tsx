import Navbar from "@/components/website/Navbar"
import Footer from "@/components/website/Footer";
import WrittenMessage from "@/components/website/ui-sections/contact/WrittenMessage";
import OtherChannels from "@/components/website/ui-sections/contact/OtherChannels";
import LocationMap from "@/components/website/ui-sections/contact/LocationMap";

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