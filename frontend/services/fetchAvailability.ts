import { useState } from "react";
import axios from "axios";
import manageAvailability from "@/website/modules/ManageAvailability";

type WeekDayObject = {
    writtenDate: string,
    databaseId: string,
    formattedDate: string,
};

const fetchAvailability = async () => {
    const [availability, setAvailability] = useState([]);
    const [date, setDate] = useState("");
    const [availDays, setAvailDays] = useState<{ currentWeekList: WeekDayObject[], nextWeekList: WeekDayObject[] }>({ currentWeekList: [], nextWeekList: [] });
    const [availHours, setAvailHours] = useState<string[]>();
    const [formattedDate, setFormattedDate] = useState("");
    const [writtenDate, setWrittenDate] = useState("");

    try {
        // Variable definition.
        const res = await axios.get("http://localhost:5001/api/availability"); // Getting availability from the backend.
        const day = date; // Create a copy of the 'date' string.
        const dayToArray = day.split(""); // Convert the string into a character-separated array.
        const firstCharacter = dayToArray[0]; // Getting the week mark ('c' or 'n') set in the 'Manage Availability' module.
        dayToArray.splice(0, 1); // Now, we can remove the week mark.

        // Using the backend's response.
        setAvailability(res.data);
        const calculatedDays = manageAvailability(res.data);
        setAvailDays(calculatedDays);

        var finalDayName = "";

        // Rebuilding the day's name by summing the array's items.
        for (let i = 0; i < dayToArray.length; i++) {
            finalDayName += dayToArray[i];
        };


        if (firstCharacter === "c") {
            // Searching for the formatted date in the CURRENT week list of days, based on its database ID.
            for (let i = 0; i < calculatedDays.currentWeekList.length; i++) {
                if (calculatedDays.currentWeekList[i].databaseId === date) {
                    setFormattedDate(calculatedDays.currentWeekList[i].formattedDate);
                    setWrittenDate(calculatedDays.currentWeekList[i].writtenDate);
                };
            };

            setAvailHours(availability[0][finalDayName]);

        } else if (firstCharacter === "n") {
            // Searching for the formatted date in the NEXT week list of days, based on its database ID.
            for (let i = 0; i < calculatedDays.nextWeekList.length; i++) {
                if (calculatedDays.nextWeekList[i].databaseId === date) {
                    setFormattedDate(calculatedDays.nextWeekList[i].formattedDate);
                    setWrittenDate(calculatedDays.nextWeekList[i].writtenDate);
                };
            };

            setAvailHours(availability[1][finalDayName]);
        }

    } catch (error) {
        console.log("Error fetching notes", error);
    };

    return {
        availDays: availDays,
        availHours: availHours,
        formattedDate: formattedDate,
        writtenDate: writtenDate,
    }

};

export default fetchAvailability;