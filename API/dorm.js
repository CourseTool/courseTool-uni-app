import axios from '@/uilts/axios.js'

export function getDormQuestionListAPI() {
	return axios.get("/common/dorm-question")
}

export function dormAllocationAPI(data) {
	return axios.post("/common/dorm-allocation", data)
}