// 익스프레스 모듈을 읽어들입니다.

const express = require('express')
const app = express()
const portNo = 3000

// URL에 따라 처리 분기하기
// 루트에 접근할 때

console.log('zzzzzz')

app.get('/', (req, res) =>{
	if(!req.query.q) {
		res.send(
		'<p><a href="?q=6">6면체 주사위</a><br />'+
		'<a href="?q=12">12면체 주사위</a></p>')
	}else {
		// 두번쨰 매개변수는 진법을 의미
		const q = parseInt(req.query.q, 10)
		console.log(q)
		res.send(
			'주사위의 값은...' + dice(q))
	}
})

function dice(n) {
	return Math.floor(Math.random() * n + 1)
}

// 서버를 실행합니다.

app.listen(portNo, () =>{
	console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})