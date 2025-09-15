import axios from '@/uilts/axios.js'
export function getStudentDataAPI(data = {
	index: 'all',
	code: 0
}) {
	return axios.get('/stu/searchStuData', {
		index: data.index,
		code: data.code
	})
}