import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";

import {
    getAllSightings,
    getSightingsById,
    createSighting,
    deleteSightingById,
    updateSightingsById
} from "./controllers/sightingsController.js";
import { sendJSONResponse, getSightings, saveSightings } from "./utils/utils.js";

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    try {
        if (req.url.startsWith("/api/sightings") && req.method === "DELETE") {
            const uuid = req.url.split("/").pop();
            return await deleteSightingById(
                req.url,
                req.method,
                res,
                uuid
            )
        }
        if (req.url.startsWith("/api/sightings/") && 
        req.method === "PUT") {
            const uuid = req.url.split("/").pop();
            return await updateSightingsById(
                req.url, 
                req.method, 
                res, 
                uuid, 
                req,
            );    
        }
        if (req.url === "/") {
            sendJSONResponse(res, 200, "application/json", {
                success: true,
                message: "Welcome to Home Page",
                requested_URL: req.url,
                requested_Method: req.method,
            })

        }
        else if (req.url === "/api/sightings" && req.method === "GET") {
            return await getAllSightings(
                req.url,
                req.method,
                res
            );

        } else if (req.url.startsWith("/api/sightings") && req.method === "GET") {
            const uuid = req.url.split("/").pop()
            return await getSightingsById(
                req.url,
                req.method,
                res,
                uuid
            )

        } else if (req.url === "/api/sightings" && req.method === "POST") {
            return await createSighting(req, res);

        } else {
            sendJSONResponse(res, 404, "application/json", {
                success: false,
                message: "Route not Found",
                requested_URL: req.url,
                requested_Method: req.method,
            })

        }
    } catch (err) {
        console.log(err)
        sendJSONResponse(res, 500, "application/json", {
            success: false,
            error: err,
            message: "Internal server error",
            requested_URL: req.url,
        })
    }

})
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});