type linkProp = {
    text: string,
}

function FooterLink(props: linkProp) {
    return (
        <p className={"text-base tracking-tight text-slate-600 hover:text-slate-900 font-normal"}>{props.text}</p>
    )
}

export default FooterLink;