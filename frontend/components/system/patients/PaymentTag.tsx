import { CreditCard, Banknote } from "lucide-react";

type TagProps = {
    frequency: string;
    modality: string;
};

function PaymentTag(props: TagProps) {
    return (
        <div className={`flex flex-row gap-1 items-center justify-center border px-2.5 py-1 rounded-full
        ${props.modality === "efectivo" ? "bg-[rgb(34,197,94,0.08)] text-green-500 border-green-400" : "bg-pink-50 text-pink-500 border-pink-400"}`}
        >
            {props.modality === "efectivo" && (
                <>
                    <Banknote size={16} />

                    <p className="text-xs font-medium">
                        Pago: efectivo ({props.frequency})
                    </p>
                </>
            )}

            {props.modality === "tarjeta" && (
                <>
                    <CreditCard size={16} />

                    <p className="text-xs font-medium">
                        Pago: tarjeta ({props.frequency})
                    </p>
                </>
            )}
        </div>
    );
};

export default PaymentTag;