import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "Poppins",
    fonts: [
        {
            /* Font sources obtain from the Google Fonts API */
            src: "https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
            fontWeight: 400,
        },
        {
            src: "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9V1tvFP-KUEg.ttf",
            fontWeight: 500,
        },
        {
            src: "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
            fontWeight: 600,
        },
        {
            src: "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
            fontWeight: 700,
        }
    ]
})

const pdfStyles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        padding: 50,
        display: "flex",
        gap: 20,
        flexDirection: "column",
    },
    businessInfo: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    bussInfoTitle: {
        fontFamily: "Poppins",
        letterSpacing: -0.7,
        fontWeight: 600,
        fontSize: 20,
    },
    bussInfoText: {
        fontFamily: "Poppins",
        letterSpacing: -0.25,
        fontWeight: 400,
        fontSize: 11,
        color: "#475569",
    },
    receipt: {
        display: "flex",
        flexDirection: "column",
    },
    header: {
        padding: 25,
        width: 325,
        backgroundColor: "#6366f1",
        color: "white",
        flexDirection: "column",
        gap: 2,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    headerTitle: {
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: -0.5,
        fontFamily: "Poppins",
    },
    headerText: {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: 14,
        opacity: 0.9,
    },
    receiptContent: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
        paddingVertical: 20,
        width: 325,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        gap: 10,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    infoField: {
        display: "flex",
        paddingHorizontal: 15,
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: 15,
    },
    badge: {
        borderRadius: 20,
        display: "flex",
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: "#e0e7ff",

    },
    badgeText: {
        fontFamily: "Poppins",
        fontWeight: 600,
        color: "#6366f1",
        fontSize: 11,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        gap: 50,
        width: "100%",
    },
    data: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontFamily: "Poppins",
    },
    dataTitle: {
        fontSize: 11,
        fontWeight: 400,
        color: "#64748b",
    },
    leftData: {
        fontSize: 11,
        fontWeight: 400,
        color: "#64748b",
        width: 120,
    },
    dataContent: {
        fontSize: 11,
        fontWeight: 400,
        color: "#0f172a",
    }
});

export default pdfStyles;