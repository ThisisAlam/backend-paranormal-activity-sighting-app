import { getSightings } from "../utils/utils.js";
import { sendJSONResponse } from "../utils/utils.js"

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