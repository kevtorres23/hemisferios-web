import { CreditCard, Banknote } from "lucide-react";

function ModalityTag({ modality }: { modality: "cash" | "card" | string }) {

    return (
        <div className={`flex flex-row gap-1 items-center justify-center border px-2.5 py-1 rounded-full
        ${modality === "cash" ? "bg-[rgb(34,197,94,0.08)] hover:bg-[rgb(34,197,94,0.15)] text-green-500 border-green-400" : "bg-pink-50 hover:bg-pink-100 text-pink-500 border-pink-400"}`}
        >
            {modality === "cash" && (
                <>
                    <Banknote size={16} />

                    <p className="text-xs font-medium">
                        Pago en efectivo
                    </p>
                </>
            )}

            {modality === "card" && (
                <>
                    <CreditCard size={16} />

                    <p className="text-xs font-medium">
                        Pago con tarjeta
                    </p>
                </>
            )}
        </div>
    );
};

export { ModalityTag };