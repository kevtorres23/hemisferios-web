import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type NavigatorProps = {
    currentPage: number;
    finalPage: number;
    labelStyles?: string;
    labelText: string;
    onPreviousClick: () => void;
    onNextClick: () => void;
}

function PageNavigator(props: NavigatorProps) {
    const [currentPage, setCurrentPage] = useState(props.currentPage);
    const [finalPage, setFinalPage] = useState(props.finalPage);
    const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    useEffect(() => {
        if (currentPage === 1 || currentPage === 0) {
            setIsPreviousDisabled(true); // User can't go back more if they are in the first page.
        } else {
            setIsPreviousDisabled(false);
        }

        if (currentPage === finalPage) { 
            setIsNextDisabled(true); // User can't advance more if they are in the last page.
        } else {
            setIsNextDisabled(false);
        }

    }, [currentPage]);

    function onPreviousClick() {
        const newCurrentPage = currentPage - 1; // Reduce the current page by 1 if the previous button is clicked.
        setCurrentPage(newCurrentPage);

        props.onPreviousClick();
    };

    function onNextClick() {
        const newCurrentPage = currentPage + 1; // Increment the current page by 1 if the previous button is clicked.
        setCurrentPage(newCurrentPage);

        props.onNextClick();
    };

    return (
        <div className="flex flex-row gap-3 items-center justify-center">

            <button onClick={onPreviousClick} disabled={isPreviousDisabled} className={`${isPreviousDisabled ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-200 text-slate-900 cursor-pointer"} font-normal border border-slate-200 p-2 flex flex-row items-center justify-center gap-1.5 rounded-md`}>
                <ChevronLeft size={16} />
            </button>

            <p className={`${props.labelStyles}`}>{props.labelText}</p>

            <button onClick={onNextClick} disabled={isNextDisabled} className={`${isNextDisabled ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-200 text-slate-900 cursor-pointer"} font-normal border border-slate-200 p-2 flex flex-row items-center justify-center gap-1.5 rounded-md`}>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default PageNavigator;