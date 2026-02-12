import { Page, Text, View, Document } from '@react-pdf/renderer';
import pdfStyles from './PDFStyles';

type ReceiptProps = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    creationDate: string;
    creationTime: string;
}

// Create styles
const styles = pdfStyles;

// Create Document Component
export default function PrintableReceipt(props: ReceiptProps) {
    const ReceiptPDF = () => (
        <Document>
            <Page size="A5" style={styles.page}>
                <View style={styles.businessInfo}>
                    <Text style={styles.bussInfoTitle}>Centro Hemisferios</Text>
                    <Text style={styles.bussInfoText}>Valle Florido S/N, Colonia La Esperanza, Durango, Dgo.</Text>
                    <Text style={styles.bussInfoText}>Tel. 618-206-8767.</Text>
                </View>
                <View style={styles.receipt}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Comprobante de la Cita</Text>
                        <Text style={styles.headerText}>Generada el {props.creationDate}, a las {props.creationTime} </Text>
                    </View>
                    <View style={styles.receiptContent}>
                        <View style={styles.infoField}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>INFORMACIÓN DEL PACIENTE</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.data}>
                                    <Text style={styles.leftData}>Nombre(s)</Text>
                                    <Text style={styles.dataContent}>{props.patientName}</Text>
                                </View>

                                <View style={styles.data}>
                                    <Text style={styles.dataTitle}>Apellido paterno</Text>
                                    <Text style={styles.dataContent}>{props.fatherSurname}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.data}>
                                    <Text style={styles.leftData}>Apellido materno</Text>
                                    <Text style={styles.dataContent}>{props.motherSurname}</Text>
                                </View>

                                <View style={styles.data}>
                                    <Text style={styles.dataTitle}>Teléfono del adulto</Text>
                                    <Text style={styles.dataContent}>{props.phoneNumber}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.infoField}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>INFORMACIÓN DE LA CITA</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.data}>
                                    <Text style={styles.leftData}>Fecha</Text>
                                    <Text style={styles.dataContent}>{props.date}</Text>
                                </View>

                                <View style={styles.data}>
                                    <Text style={styles.dataTitle}>Hora</Text>
                                    <Text style={styles.dataContent}>{props.hour}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </Page>
        </Document>

    )

    return (
        <ReceiptPDF />
    )
}