import http from "node:http"
import fs from "node:fs/promises"
import { getSightings } from "./utils/utils.js";

const PORT = 8000

const server = http.createServer(async (req, res) => {
    
    if(req.url === "/"){
        res.writeHead(200, { "Content-Type": "application/json", })
        res.end(JSON.stringify({
            success: true,
            message: "Welcome to Home Page",
            requested_URL: req.url,
            requested_Method: req.method,
        },null,2))
    }
    else if(req.url === "/api/sightings" && req.method === "GET"){
        const sightings = await getSightings();
        res.writeHead(200, { "Content-Type": "application/json", })
        return res.end(JSON.stringify({
            success: true,
            data: sightings,
            requested_URL: req.url,
            requested_Method: req.method,
        },null,2))
    } else {
        res.writeHead(404, { "Content-Type": "application/json", })
        res.end(JSON.stringify({
            success: false,
            message: "Route not Found",
            requested_URL: req.url,
            requested_Method: req.method,
        },null,2))
    }

})
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});