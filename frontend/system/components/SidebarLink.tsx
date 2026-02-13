type SidebarLinkProps = {
    name: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick?: () => void;
}

function SidebarLink(props: SidebarLinkProps) {
    return (
        <button onClick={props.onClick} className={`w-full flex flex-row gap-2 ${props.isActive ? "bg-indigo-500 text-white font-medium" : "bg-white text-slate-600 font-normal hover:bg-slate-100"} cursor-pointer rounded-sm px-3 py-2 items-center`}>
            {props.icon}
            
            <p className="text-sm">{props.name}</p>
        </button>
    );
};

export default SidebarLink;