import fs from "node:fs/promises"

export async function getSightings() {
    try {
        const data = await fs.readFile(
            "./data/sightings.json",
            "utf-8"
        )
        return JSON.parse(data);
    } catch(err){
        console.log(err)
        throw err;
    }
}