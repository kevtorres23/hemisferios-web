import SearchBar from "../SearchBar";
import { useState } from "react";
import PageNavigator from "../PageNavigator";
import { CommentType } from "@/utils/types";
import { useId } from "react";
import CommentCard from "./CommentCard";

type GridProps = {
    data: CommentType[][]; // A list containing the pages of a list of comment objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    view: "seen" | "unseen";
}

function CommentGrid(props: GridProps) {
    const id = useId();
    const [pages, setPages] = useState(props.data?.length);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar comentario por nombre de la persona" />

                <div className="filters flex sm:flex-row flex-col gap-2.5 sm:w-auto w-full items-center">
                    <div className="flex flex-row gap-2.5 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>

                        <PageNavigator labelText={`${currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                {props.data[currentPage - 1].map((item, id) =>
                    <CommentCard
                        key={id}
                        name={item.name}
                        lastName={item.lastName}
                        phoneNumber={item.phoneNumber}
                        email={item.email}
                        message={item.message}
                        date={item.date}
                        status={"unseen"}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentGrid;