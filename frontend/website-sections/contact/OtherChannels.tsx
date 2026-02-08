"use client";

import SectionBadge from "@/website-components/SectionBadge";
import Image from "next/image";
import notification from "../../public/notification.png";
import ContactChannel from "@/website-components/ContactChannel";
import { Phone, Mail, MapPin } from "lucide-react";
import { useRef } from "react";
import { isVisible } from "@/website-modules/VisibilityDetector";
import ChannelBox from "@/website-components/ChannelBox";

function OtherChannels() {
    const ref1 = useRef(null);
    const isContentVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isFormVisible = isVisible(ref2);

    return (
        <section className="xl:px-25 lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col-reverse lg:pt-0 lg:pb-40 sm:py-24 py-12 xl:gap-30 gap-15 items-center justify-center">
            <div ref={ref1} className={`${isContentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-900 ease-in lg:max-w-xl w-full`}>
                <ChannelBox showContainer={true} title="Medios de Contacto" areChannelsGray={false}/>
            </div>

            <div ref={ref2} className={`${isFormVisible ? 'top-0 opacity-100' : 'top-20 opacity-0'} relative flex flex-col gap-12 items-center justify-center transition-all ease-out duration-1500`}>

                <div className="flex flex-col gap-4 items-center justify-center">
                    <SectionBadge name="OTROS MEDIOS" />

                    <h1 className={`sm:text-4xl/12 text-3xl font-semibold text-slate-900 tracking-tighter text-center`}>También puedes contactarnos por los siguientes medios.</h1>

                    <p className={`text-base font-normal text-slate-600 text-center w-10/12`}>
                        Ponemos a tu disposición diversas maneras para que puedas comunicarte con nosotros fácilmente.
                    </p>
                </div>

                <Image alt="" src={notification} className="sm:w-60 w-56" />
            </div>

        </section>
    )
}

export default OtherChannels;