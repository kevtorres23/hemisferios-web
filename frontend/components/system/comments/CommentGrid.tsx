import SearchBar from "../SearchBar";
import { useEffect, useState, useContext } from "react";
import PageNavigator from "../PageNavigator";
import { CommentType } from "@/utils/types";
import { CardActionContext } from "@/app/system/comments/page";
import { useId } from "react";
import CommentCard from "./CommentCard";
import { pageSeparator } from "@/utils/system/page-separator";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type GridProps = {
    data: CommentType[]; // A list containing the pages of a list of comment objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    view: "seen" | "unseen";
}

function CommentGrid(props: GridProps) {
    let commentData = props.data;

    const [pages, setPages] = useState(1);
    const [commentPages, setCommentPages] = useState<any[][]>(pageSeparator(commentData))
    const [currentPage, setCurrentPage] = useState(props.data.length === 0 ? 0 : 1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let commentData = props.data;
        setCommentPages(pageSeparator(commentData));
        setPages(pageSeparator(commentData).length);

        if (pageSeparator(commentData).length === 0) {
            setCurrentPage(1);
        };

        if (currentPage === 0 || (pageSeparator(commentData).length) === 0) {
            setCurrentPage(1);
        }

        if (currentPage > pageSeparator(commentData).length) {
            setCurrentPage(currentPage - 1);
        };
    }, [props.data])

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre de la persona" />

                <div className="filters flex sm:flex-row flex-col gap-2.5 sm:w-auto w-full items-center">
                    <div className="flex flex-row gap-2.5 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>

                        <PageNavigator labelText={`${currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                {commentPages[currentPage - 1].filter((comment: CommentType) => {
                    return search.toLowerCase() === ""
                        ? comment
                        : comment.name.toLowerCase().includes(search.toLowerCase());
                }).map((item, id) => {
                    let creationDate = new Date(item.createdAt);

                    console.log(creationDate);
                    return (
                        <CommentCard
                            key={id}
                            _id={item._id}
                            name={item.name}
                            lastName={item.lastName}
                            phoneNumber={item.phoneNumber}
                            email={item.email}
                            message={item.message}
                            createdAt={format(creationDate, "PP", { locale: es })}
                            status={item.status}
                        />
                    )
                }
                )}
            </div>
        </div>
    );
};

export default CommentGrid;