import { CommentType } from "@/utils/types";

function filterCommentsByStatus(data: CommentType[], status: string) {
    const filteredComments = data.filter((comment) => comment.status === status);

    return filteredComments;
};

export { filterCommentsByStatus };