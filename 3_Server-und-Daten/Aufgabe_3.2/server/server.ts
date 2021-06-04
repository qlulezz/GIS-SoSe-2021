import * as Http from "http";
import * as Url from "url";

export namespace P3_2 {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);

    if (!port)
        port = 8100;
  
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            if (url.pathname == "/html") {
                for (let key in url.query) {
                    _response.write(key + ": " + url.query[key] + "<br>");
                }
            }
            if (url.pathname == "/json") {
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
            }
            _response.end();
        }
    }
}
