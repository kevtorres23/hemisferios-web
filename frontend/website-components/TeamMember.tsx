import SectionBadge from "./SectionBadge";
import Image, { StaticImageData } from "next/image";

type MemberProps = {
    name: string,
    role: string,
    picture: StaticImageData
}

function TeamMember(props: MemberProps) {
    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <div className="relative w-40 h-40">
                <Image src={props.picture} alt="" objectFit="cover" fill={true} className="rounded-[50%] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]" />
            </div>

            <h1 className="text-2xl font-medium text-slate-900 tracking-tight">{props.name}</h1>

            <SectionBadge name={props.role}/>

        </div>
    )
}

export default TeamMember;