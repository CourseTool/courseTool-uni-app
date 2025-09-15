import axios from '@/uilts/axios.js'

export function getDkData(id) {
	return axios.get('/stu/getDkData', {
		id
	})
}
export function addDk(data) {
	return axios.post('/stu/createDK', data)
}
export function getStuDkedList(code) {
	return axios.get('/stu/getStuDkedList', {
		code
	})
}
export function getStuDkList(dkId) {
	return axios.get('/stu/getStuDkList', {
		dkId
	})
}