type linkProp = {
    text: string,
    active: true | false;
}

function NavbarLink(props: linkProp) {
    return (
        <p className={props.active === true ? `text-base tracking-tight text-indigo-500 font-medium lg:px-4 px-3 py-2 bg-[rgb(99,102,241,0.12)] lg:rounded-full rounded-sm` : `text-base tracking-tight font-normal text-slate-600 cursor-pointer hover:text-indigo-500 w-auto`}>{props.text}</p>
    )
}

export default NavbarLink;