type linkProp = {
    text: string,
}

function FooterLink(props: linkProp) {
    return (
        <p className={"sm:text-sm text-base tracking-tight text-slate-600 hover:text-slate-900 font-normal"}>{props.text}</p>
    )
}

export default FooterLink;