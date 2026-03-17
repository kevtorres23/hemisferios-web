import SmallModal from "./SmallModal";
import { CommentType } from "@/utils/types";
import TextMessageModal from "./TextMessageModal";
import { ModalProps } from "@/utils/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type CommentModalProps = {
    name: string;
    lastName: string;
    date: string;
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

function RemoveCommentModal(props: ModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Eliminar comentario"
            message="¿Estás segur@ de que deseas eliminar este comentario?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Eliminar"
        >

        </SmallModal>
    );
};

function SeeCommentModal(props: CommentModalProps) {
    const commentDate = new Date(props.date);
    console.log(props.date);
    const formattedDate = format(commentDate, "PPP", { locale: es });

    return (
        <TextMessageModal
            title={`Comentario de ${props.name} ${props.lastName}`}
            desc={`Enviado el ${formattedDate}`}
            textMessage={props.message}
            isVisible={props.isVisible}
            buttonText="Cerrar comentario"
            onClose={props.onClose}
        />
    );
}

export { RemoveCommentModal, SeeCommentModal };