import { CreditCard, Banknote, CalendarCheck2 } from "lucide-react";

function ModalityTag({ modality }: { modality: "cash" | "card" | "session" | string }) {
    type Modalities = "cash" | "card" | "session";
    
    const stylesByModality: Record<Modalities, string> = {
        cash: "bg-[rgb(34,197,94,0.08)] hover:bg-[rgb(34,197,94,0.15)] text-green-500 border-green-400",
        card: "bg-pink-50 hover:bg-pink-100 text-pink-500 border-pink-400",
        session: "bg-orange-50 hover:bg-orange-100 text-orange-500 border-orange-400"
    }

    return (
        <div className={`flex flex-row gap-1 items-center justify-center border px-2.5 py-1 rounded-full
        ${stylesByModality[modality as keyof Record<Modalities, string>]}`}
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