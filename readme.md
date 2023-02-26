# html-to-docx-server

## POST request
POST http://127.0.0.1:8080
Content-Type: application/json

{
    "html": "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\" /><title>Document</title></head><body><div><p>Taken from wikipedia</p></div></body></html>"
    "fileName": "document.docx"
}


## docker image

docker build . -t petrbalat/html-to-docx-server

docker run -p 8080:8080 -d petrbalat/html-to-docx-server
