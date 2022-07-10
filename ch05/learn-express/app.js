const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000); // 실행할 포트 설정. 

app.get('/', (req, res) => { // get 요청이 들어올 때 어떤 동작을 할지 적는 부분
    res.send('Hello, Express'); // get / 요청이 들어올 때 Hello, Express를 전송함
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})