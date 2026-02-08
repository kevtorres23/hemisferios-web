export default function TextTransitionEffect() {
    const isIllustrationVisible = true;
    return(
        `${isIllustrationVisible ? "opacity-100 top-0" : "opacity-0 top-20"} relative transition-opacity ease-in duration-1000`
    )
};