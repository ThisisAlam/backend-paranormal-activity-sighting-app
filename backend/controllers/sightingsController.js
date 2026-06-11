import {
    getSightings,
    sendJSONResponse,
    saveSightings
} from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";
import { sanitizeInput } from "../utils/sanitize.js"


export async function createSighting(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    })
    req.on("end", async () => {
        console.log(body)
        try {
            const reqBody = JSON.parse(body);
            const {
                title,
                location,
                text,
                timeStamp
            } = reqBody;
            // Required fields validation
            if (
                !title?.trim() ||
                !location?.trim() ||
                !text?.trim() ||
                !timeStamp?.trim()
            ) {
                return sendJSONResponse(
                    res,
                    400,
                    "application/json",
                    {
                        success: false,
                        message: "All fields are required"
                    }
                );
            }
            // TimeStamp validation
            if (isNaN(Date.parse(timeStamp))) {
                return sendJSONResponse(
                    res,
                    400,
                    "application/json",
                    {
                        success: false,
                        message: "Invalid date"
                    }
                );
            }
            // Length validation
            if (title.length > 100) {
                return sendJSONResponse(
                    res,
                    400,
                    "application/json",
                    {
                        success: false,
                        message: "Title cannot exceed 100 characters"
                    }
                );
            }

            if (location.length > 100) {
                return sendJSONResponse(
                    res,
                    400,
                    "application/json",
                    {
                        success: false,
                        message: "Location cannot exceed 100 characters"
                    }
                );
            }

            if (text.length > 5000) {
                return sendJSONResponse(
                    res,
                    400,
                    "application/json",
                    {
                        success: false,
                        message: "Story cannot exceed 5000 characters"
                    }
                );
            }
            // Sanitization
            const cleanTitle = sanitizeInput(title.trim());
            const cleanLocation = sanitizeInput(location.trim());
            const cleanText = sanitizeInput(text.trim());

            const newSighting = {
                uuid: uuidv4(),
                title: cleanTitle,
                location: cleanLocation,
                text: cleanText,
                timeStamp
            };

            const sightings = await getSightings();

            sightings.unshift(newSighting);

            await saveSightings(sightings);

            sendJSONResponse(res, 201, "application/json", {
                success: true,
                data: newSighting
            }
            );

        } catch (err) {
            return sendJSONResponse(
                res,
                400,
                "application/json",
                {
                    success: false,
                    message: "Invalid JSON data"
                }
            );
        }
    })

}


export async function getAllSightings(reqUrl, reqMethod, res) {
    try {
        const sightings = await getSightings();
        sendJSONResponse(res, 200, "application/json", {
            success: true,
            data: sightings,
            requested_URL: reqUrl,
            requested_Method: reqMethod,
        })
    } catch (error) {
        sendJSONResponse(res, 404, "application/json", {
            success: false,
            message: "Sightings not found",
            error: error,
            requested_URL: reqUrl,
        })
    }
}

export async function getSightingsById(reqUrl, reqMethod, res, uuid) {
    try {
        const sightings = await getSightings()
        const content = sightings.find(sighting => sighting.uuid === uuid)
        if (!content) {
            return sendJSONResponse(
                res,
                404,
                "application/json",
                {
                    success: false,
                    message: "Sighting not found"
                }
            );
        }
        sendJSONResponse(res, 200, "application/json", {
            success: true,
            data: content,
            requested_URL: reqUrl,
            requested_Method: reqMethod,
        })
    } catch (error) {
        sendJSONResponse(res, 404, "application/json", {
            success: false,
            message: "Sighting not found",
            requested_URL: reqUrl,
            requested_Method: reqMethod,
        })
    }
}


export async function updateSightingsById(reqUrl, reqMethod, res, uuid, req) {
    try {
        const sightings = await getSightings();
        const sightingsToEdit = sightings.find(sighting => {
            return sighting.uuid === uuid
        })
        if (!sightingsToEdit) {
            return sendJSONResponse(
                res,
                404,
                "application/json",
                {
                    success: false,
                    message: "Sighting not found",
                    requested_URL: reqUrl,
                    requested_Method: reqMethod,
                }
            )
        }
        let body = ""
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", async () => {
            try {
                const updatedData = JSON.parse(body);
                if (
                    !updatedData.title ||
                    !updatedData.location ||
                    !updatedData.timeStamp ||
                    !updatedData.text
                ) {
                    return sendJSONResponse(
                        res,
                        400,
                        "application/json",
                        {
                            success: false,
                            message: "All fields are required"
                        }
                    );
                }
                sightingsToEdit.title = updatedData.title;
                sightingsToEdit.location = updatedData.location;
                sightingsToEdit.timeStamp = updatedData.timeStamp;
                sightingsToEdit.text = updatedData.text;
                await saveSightings(sightings);
                sendJSONResponse(
                    res,
                    200,
                    "application/json",
                    {
                        success: true,
                        sightings_to_edit: sightingsToEdit,
                        updated_data: updatedData,
                        requested_URL: reqUrl,
                        requested_Method: reqMethod,
                    }
                );
            } catch (err) {
                sendJSONResponse(
                    res,
                    400,
                    "application/json",
                    {
                        success: false,
                        message: "Invalid JSON data"
                    }
                );
            }
        });
    } catch (err) {
        sendJSONResponse(
            res,
            500,
            "application/json",
            {
                success: false,
                message: "Internal server error",
                error: err.message,
                requested_URL: reqUrl,
                requested_Method: reqMethod,
            }
        );
    }
}


export async function deleteSightingById(reqUrl, reqMethod, res, uuid) {
    try {
        const sightings = await getSightings();
        const sightingToDelete = sightings.find(
            sighting => sighting.uuid === uuid
        );
        if (!sightingToDelete) {
            return sendJSONResponse(
                res,
                404,
                "application/json",
                {
                    success: false,
                    message: "Sighting not found",
                    requested_URL: reqUrl,
                    requested_Method: reqMethod,
                }
            );
        }
        const updatedSightings = sightings.filter(
            sighting => sighting.uuid !== uuid
        );
        await saveSightings(updatedSightings);
        sendJSONResponse(
            res,
            200,
            "application/json",
            {
                success: true,
                message: "Sighting deleted successfully",
                deleted: sightingToDelete,
                requested_URL: reqUrl,
                requested_Method: reqMethod,
            }
        );
    } catch (err) {
        console.log(err);
        sendJSONResponse(
            res,
            500,
            "application/json",
            {
                success: false,
                message: "Internal server error",
                error: err.message,
                requested_URL: reqUrl,
                requested_Method: reqMethod,
            }
        );
    }
}

