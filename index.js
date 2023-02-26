import HTMLtoDOCX from 'html-to-docx';
import http from 'http';

/**
 * http post požadavek s json objektem povinným html a volitelně options
 */
const server = http.createServer(async (req, res) => {
    try {
        if (req.method === 'POST') {
            let html;
            let options;
            let fileName;
            req.on('data', async data => {
                const body = JSON.parse(data);
                if (!body.html) throw new Error('No html provided');

                html = body.html;
                fileName = body.fileName;
                options = body.options ?? {};
            });

            req.on("end", async function () {
                const result = await HTMLtoDOCX(html, null, options);

                res.setHeader("Access-Control-Allow-Origin", `*`);
                res.setHeader("Content-Disposition", `attachment;filename=${fileName}`);
                res.writeHead(200, {"Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});

                res.write(result);
                res.end();
            });
        } else if(req.method === 'GET' && req.url === '/live') {
            res.writeHead(200);
            res.write('ok');
            res.end();
        } else {
            res.writeHead(400);
            res.end();
        }
    } catch (e) {
        res.writeHead(500);
        res.end();
    }
});

const port = +(process.env.PORT ?? '8080');
const host = process.env.HOST ?? 'localhost';
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
