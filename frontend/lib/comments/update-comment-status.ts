import { CommentType } from "@/utils/types";
import api from "../axios";

async function getCommentById(commentId: string) {
    try {
        const res = await api.get("/messages/" + commentId);
        const foundComment: CommentType = res.data;

        return foundComment;
    } catch (error) {
        console.log("An error ocurred while getting the comment:", error)
    };
};


async function updateCommentStatus(commentId: string, newStatus: string) {
    try {
        const res = await api.get("/messages/" + commentId);
        const foundComment: CommentType = res.data;

        const newComment = {
            name: foundComment.name,
            lastName: foundComment.lastName,
            phoneNumber: foundComment.phoneNumber,
            email: foundComment.email,
            message: foundComment.message,
            status: newStatus,
        };

        await api.put("/messages/" + commentId, newComment);

        const newResponse = await api.get("/messages");
        const updatedComments: CommentType[] = newResponse.data;
        return updatedComments;

    } catch (error) {
        console.log("An error ocurred while updating the comment:", error)
    };
};

export { updateCommentStatus, getCommentById };