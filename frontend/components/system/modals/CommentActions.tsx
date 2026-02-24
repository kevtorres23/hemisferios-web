import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import { Calendar } from "lucide-react";
import NewTherapistForm from "../therapists/NewTherapistForm";
import { CommentType } from "@/utils/types";
import TextMessageModal from "./TextMessageModal";
import { ModalProps } from "@/utils/types";

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
    return (
        <TextMessageModal
            title={`Comentario de ${props.name} ${props.lastName}`}
            desc={`Enviado el ${props.date}`}
            textMessage={props.message}
            isVisible={props.isVisible}
            buttonText="Cerrar comentario"
            onClose={props.onClose}
        />
    );
}

export { RemoveCommentModal, SeeCommentModal };