import fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const __dirname = import.meta.dirname;
const filePath = path.join(
    __dirname,
    "../data/sightings.json"
);

export async function getSightings() {
    try {
        const data = await fs.readFile(
            filePath,
            "utf-8"
        );
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function saveSightings(sightings) {
    await fs.writeFile(
        filePath,
        JSON.stringify(sightings, null, 2)
    )
}

export function sendJSONResponse(
    res,
    statusCode,
    contentType,
    JSONObj
) {
    res.writeHead(statusCode, {
        "Content-Type": contentType,
    });
    res.end(
        JSON.stringify(JSONObj, null, 2)
    );
}