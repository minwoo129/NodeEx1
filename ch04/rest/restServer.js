const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async(req, res) => {
    try {
        console.log(req.method, req.url);
        const {method, url} = req;

        if(method == 'GET') {
            if(url == '/') {
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            }
            else if(url == '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            }
            else if(url == '/users') {
                res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            
            // 주소가 /도 /about도 아니면
            try {
                const data = await fs.readFile(`.${url}`);
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 라우트를 찾지 못했다는 에러 발생: 404 error
            }
        }
        else if(method == 'POST') {
            if(url == '/user') {
                let body = '';
                // 요청의 body를 stream 형식으로 받음
                req.on('data', (data) => {
                    body += data;
                });

                // 요청의 body를 다 받은 후 실행됨
                return req.on('end', () => {
                    console.log('POST 본문(Body):', body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201);
                    res.end('등록 성공');
                });
            }
        }
        else if(method == 'PUT') {
            if(url.startsWith('/user/')) {
                const key = url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });

                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                })
            }
        }
        else if(method == 'DELETE') {
            if(url.startsWith('/user/')) {
                const key = url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다.');
});