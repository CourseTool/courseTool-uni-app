import axios from "@/uilts/axios.js";

export async function getElectricAPI(dormId) {
    return await axios.get("/ecard/electric?dormId=" + dormId);
}
