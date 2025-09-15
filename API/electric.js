import axios from '@/uilts/axios.js'

export function getElectricAPI(data) {
	return axios.post("https://ecard.hniu.cn:9029/GetUserInfoXT.aspx", data)
}