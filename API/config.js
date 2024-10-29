import axios from '@/uilts/axios.js'

export const getCourseConfigAPISync = async () => {
	const res = await axios.get("/common/config")
	return res.data.data
}