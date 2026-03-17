import { useEffect, useState } from "react";

/**
 * Checks if an element in the UI is visible by detecting if it enters in the viewport.
 * @param ref 
 * @returns A boolean indicating if the element is visible.
 */

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