import { getSightings } from "../utils/utils.js";
import { sendJSONResponse } from  "../utils/utils.js"

export async function getAllSightings(reqUrl, reqMethod, res) {
    const sightings = await getSightings();
    sendJSONResponse(res, 200, "application/json", {
        success: true,
        message: sightings,
        requested_URL: reqUrl,
        requested_Method: reqMethod,
    })
}