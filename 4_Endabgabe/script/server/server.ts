import * as Mongo from "mongodb";
import * as Http from "http";
import * as Url from "url";

export namespace P3_4 {
    // let mongoURL: string = "mongodb://localhost:27017";
    let mongoURL: string = "mongodb+srv://user:test1234@qlu.qvisc.mongodb.net/end?retryWrites=true&w=majority";
    let db: string = "end";

    interface Score {
        name: string;
        id: string;
        time: string;
        date: string;
        first: string;
        ip: string;
        address: string;
    }

    interface Link {
        link: string;
        name: string;
        date: string;
        ip: string;
        address: string;
    }

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

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        //console.log("I hear voices!");
        let ip: string = _request.headers["x-forwarded-for"] + "";
        let address: string = _request.socket.remoteAddress + "";
        console.log("[Connect-Request] from " + ip + " (" + address + ")");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            if (url.pathname == "/sendscore") {
                console.log("[SendScore-Request] from " + ip);
                let s: Score = { name: url.query.name + "", id: url.query.id + "", time: url.query.time + "", date: url.query.date + "", first: url.query.first + "", ip: ip, address: address };
                let response: string = await sendScoreData(s);
                _response.write(response);
            }
            if (url.pathname == "/receivescores") {
                console.log("[ReceiveScore-Request] from " + ip);
                let response: Score[] = await receiveScoreData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/sendlink") {
                console.log("[SendLink-Request] from " + ip);
                let l: Link = { link: url.query.link + "", name: url.query.name + "", date: url.query.date + "", ip: ip, address: address };
                let response: string = await sendLinkData(l);
                _response.write(response);
            }
            if (url.pathname == "/receivegamelink") {
                console.log("[ReceiveGameLink-Request] from " + ip);
                let response: Link[] = await receiveLinkData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/receiveadminlink") {
                console.log("[ReceiveAdminLink-Request] from " + ip);
                let response: Link[] = await receiveLinkData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/deletelink") {
                console.log("[DeleteLink-Request] from " + ip);
                let l: Link = { link: url.query.link + "", name: url.query.name + "", date: url.query.date + "", ip: ip, address: address };
                let response: string = await deleteLinkData(l);
                _response.write(response);
            }
            _response.end();
        }
    }

    async function connectScoreDB(): Promise<Mongo.Collection> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(mongoURL, options);
        await mongoClient.connect();

        let col: string = "scores";
        let scores: Mongo.Collection = mongoClient.db(db).collection(col);
        return scores;
    }

    async function connectLinkDB(): Promise<Mongo.Collection> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(mongoURL, options);
        await mongoClient.connect();

        let col: string = "links";
        let links: Mongo.Collection = mongoClient.db(db).collection(col);
        return links;
    }

    async function sendScoreData(s: Score): Promise<string> {
        let scores: Mongo.Collection = await connectScoreDB();
        let output: string = "";
        if (await scores.countDocuments({ "id": s.id }) != 0) {
            if (s.first == "false") {
                console.log("Insert successful: Name: '" + s.name + "' ID: '" + s.id + "' Time: " + s.time + " First: " + s.first);
                scores.insertOne(s);
                output = "true";
            } else {
                console.log("Insert failed: ID already in Database");
                output = "false";
            }
        } else {
            console.log("Insert successful: Name: '" + s.name + "' ID: '" + s.id + "' Time: " + s.time + " First: " + s.first);
            scores.insertOne(s);
            output = "true";
        }
        return output;
    }

    async function receiveScoreData(): Promise<Score[]> {
        let scores: Mongo.Collection = await connectScoreDB();
        let cursor: Mongo.Cursor = scores.find();
        let result: Score[] = await cursor.toArray();
        return result;
    }

    async function sendLinkData(l: Link): Promise<string> {
        let links: Mongo.Collection = await connectLinkDB();
        let output: string = "";
        if (await links.countDocuments({ "link": l.link }) != 0) {
            console.log("Insert failed: URL already in Database");
            output = "false";
        } else {
            console.log("Insert successful: Name: '" + l.name + "' URL: " + l.link);
            links.insertOne(l);
            output = "true";
        }
        return output;
    }

    async function receiveLinkData(): Promise<Link[]> {
        let links: Mongo.Collection = await connectLinkDB();
        let cursor: Mongo.Cursor = links.find();
        let result: Link[] = await cursor.toArray();
        return result;
    }

    async function deleteLinkData(l: Link): Promise<string> {
        let links: Mongo.Collection = await connectLinkDB();
        let output: string = "";
        if (await links.countDocuments({ "link": l.link }) == 0) {
            console.log("Someone is trying to delete something that isn't there.");
            output = "Bild-URL wurde nicht gefunden.";
        } else {
            console.log("Image removed: '" + l.name + "' URL: " + l.link);
            links.deleteOne({ "link": l.link });
            output = "Das Bild " + l.name + " wurde entfernt.";
        }
        return output;
    }
}