type linkProp = {
    text: string,
    active: true | false;
}

function NavbarLink(props: linkProp) {
    return (
        <p className={props.active === true ? `text-base tracking-tight text-indigo-500 font-medium px-4 py-2 bg-[rgb(99,102,241,0.12)] rounded-full` : `text-base tracking-tight font-normal text-slate-600 cursor-pointer hover:text-indigo-500`}>{props.text}</p>
    )
}

export default NavbarLink;