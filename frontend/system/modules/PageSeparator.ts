// PURPOSE OF THE MODULE: to receive all the appointments stored in the database and separate them in 'n' pages that contain maximum nine appointments appointments each.

import { AppointmentType } from "@/system/modules/Types";

type AppointmentDataset = AppointmentType[];

function pageSeparator(appointments: AppointmentDataset) {
    const createdPages = []; // Array where we will store subarrays that contain 9 appointment objects.
    let appointmentStorer = [] // Array that stores nine appointment objects to later be added to the createdPages array.

    for (let i = 0; i < appointments.length; i++) {
        if (appointmentStorer.length === 9) {
            createdPages.push(appointmentStorer);
            appointmentStorer = []; // When it has 9 appointment objects, we empty it to make space for the next 9 objects.
        };

        appointmentStorer.push(appointments[i]);
    };

    // If the iteration ends, and the appointmentStorer has more than one appointment but less than 9, it will still be counted as a page. Therefore, let's push it.
    if (appointmentStorer.length > 0) {
        createdPages.push(appointmentStorer);
    }

    return createdPages; // Finally, we'll return an array with n pages, where each contain more than one appointment and less than nine. 
};

export { pageSeparator };