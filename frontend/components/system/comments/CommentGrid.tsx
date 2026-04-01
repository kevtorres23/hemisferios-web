import SearchBar from "../SearchBar";
import { useEffect, useState } from "react";
import PageNavigator from "../PageNavigator";
import { Button } from "@/components/ui/button";
import { CalendarArrowUp, CalendarArrowDown } from "lucide-react";
import { CommentType } from "@/utils/types";
import CommentCard from "./CommentCard";
import { pageSeparator } from "@/utils/system/page-separator";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { compareAsc } from "date-fns";

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
    const [order, setOrder] = useState(true); // true for most-recent first. false for least-recent. 
    const [search, setSearch] = useState("");

    useEffect(() => {
        let commentData = props.data;

        let olderFirst;
        let newerFirst;

        if (props.view === "seen") {
            // When the callback function's result is positive, the second argument comes first, and the first, comes after.
            olderFirst = [...props.data].sort((commentA, commentB) => compareAsc(commentA.createdAt, commentB.createdAt));
            newerFirst = [...props.data].sort((commentA, commentB) => compareAsc(commentB.createdAt, commentA.createdAt));

            if (order) {
                setCommentPages(pageSeparator(newerFirst));
            } else {
                setCommentPages(pageSeparator(olderFirst));
            };

            setPages(pageSeparator(commentData).length);

        } else {
            setCommentPages(pageSeparator(commentData));
            setPages(pageSeparator(commentData).length);
        }

        if (pageSeparator(commentData).length === 0) {
            setCurrentPage(1);
        };

        if (currentPage === 0 || (pageSeparator(commentData).length) === 0) {
            setCurrentPage(1);
        }

        if (currentPage > pageSeparator(commentData).length) {
            setCurrentPage(currentPage - 1);
        };
    }, [props.data, order])

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre de la persona" />

                <div className="filters flex sm:flex-row flex-col gap-3 sm:w-auto w-full items-center">
                    {props.view === "seen" && (
                        <Button onClick={() => setOrder(!order)} className="" variant="outline">
                            {order && (
                                <>
                                    <CalendarArrowUp size={14} />
                                    <p>Más recientes</p>
                                </>
                            )}

                            {!order && (
                                <>
                                    <CalendarArrowDown size={14} />
                                    <p>Más antiguos</p>
                                </>
                            )}
                        </Button>
                    )}

                    <div className="flex flex-row gap-2.5 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>
                        <PageNavigator labelText={`${currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            <>
                <p className="text-slate-800 font-medium text-lg">Hay <span className="font-semibold text-indigo-500">{props.data.length}</span> comentarios leídos</p>

                <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                    {commentPages[currentPage - 1].filter((comment: CommentType) => {
                        return search.toLowerCase() === ""
                            ? comment
                            : comment.name.toLowerCase().includes(search.toLowerCase());
                    }).map((item, id) => {
                        let creationDate = new Date(item.createdAt);

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
            </>
        </div>
    );
};

export default CommentGrid;