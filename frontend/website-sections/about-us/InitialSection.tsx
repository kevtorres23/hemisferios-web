import initialSectionImage from "../../public/about-us-1.svg";
import Image from "next/image";

function InitialSection() {
    return (
        <main className="w-full bg-indigo-500 lg:pt-24 lg:pb-40 sm:py-24 py-20 lg:px-16 sm:px-12 px-8 flex lg:flex-row flex-col md:gap-28 gap-10 items-center justify-center">
            <div className="text flex flex-col gap-6 lg:items-start items-center justify-center lg:max-w-lg">
                <div className="px-4 py-1.5 bg-[rgb(0,0,0,0.20)] rounded-full">
                    <p className="text-white sm:text-sm text-xs font-semibold">CONOCE SOBRE NOSOTROS</p>
                </div>

                <h1 className="md:text-5xl/14 sm:text-4xl text-3xl font-semibold text-white tracking-tighter lg:text-start text-center">Un proyecto que nació de la pasión genuina por ayudar.</h1>

                <p className="sm:text-base text-sm font-normal text-white lg:text-start text-center">Hemisferios es un centro de terapia creado con el propósito de poder ayudar a niñas y niños del estado de Durango.</p>
            </div>

            <div>
                <Image src={initialSectionImage} className="lg:max-w-sm md:max-w-96 sm:max-w-72 max-w-60 scale-y-[-1]" alt=""/>
            </div>
        </main>
    )
}

export default InitialSection;