import { useEffect, useState } from "react";

export function isVisible(ref: any) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        {/* Create a new Intersection instance. */}
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting); {/* We set the isIntersecting variable to true if the observer detects the element is within the viewport.*/}
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect;
        };

    }, [ref])

    return isIntersecting;
}