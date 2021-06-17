import * as Mongo from "mongodb";
import * as Http from "http";
import * as Url from "url";

export namespace P3_4 {
    // let mongoURL: string = "mongodb://localhost:27017";
    let mongoURL: string = "mongodb+srv://user:test1234@qlu.qvisc.mongodb.net/3_4?retryWrites=true&w=majority";
    let db: string = "3_4";
    let col: string = "students";

    interface Student {
        fname: string;
        lname: string;
        matrikel: number;
        studiengang: string;
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
        console.log("I hear voices!");
        console.log("[Request] from " + _request.socket.remoteAddress + " (" + _request.headers["x-forwarded-for"] + ")");
        
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let s: Student = { fname: url.query.fname + "", lname: url.query.lname + "", matrikel: parseInt(url.query.matrikel + ""), studiengang: url.query.studiengang + "" };
            if (url.pathname == "/send") {
                let response: string = await sendData(s);
                _response.write(response);
            }
            if (url.pathname == "/receive") {
                let response: Student[] = await receiveData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/del") {
                let response: string = await deleteData(s);
                _response.write(response);
            }
            _response.end();
        }
    }

    async function connectDB(): Promise<Mongo.Collection> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(mongoURL, options);
        await mongoClient.connect();
        let students: Mongo.Collection = mongoClient.db(db).collection(col);
        return students;
    }

    async function sendData(s: Student): Promise<string> {
        let students: Mongo.Collection = await connectDB();
        let output: string = "";
        if (s.matrikel + "" == "NaN") {
            output = "Die Matrikelnummer ist ungültig.";
        } else if (await students.countDocuments({ "matrikel": s.matrikel }) != 0) {
            output = "StudentIn mit dieser Matrikelnummer existiert bereits.";
        } else {
            students.insertOne(s);
            output = "StudentIn '" + s.fname + "' (" + s.matrikel + ") " + "hinzugefügt.";
        }
        return output;
    }

    async function receiveData(): Promise<Student[]> {
        let students: Mongo.Collection = await connectDB();
        let cursor: Mongo.Cursor = students.find();
        let result: Student[] = await cursor.toArray();
        return result;
    }

    async function deleteData(s: Student): Promise<string> {
        let students: Mongo.Collection = await connectDB();
        let output: string = "";
        if (s.matrikel + "" == "NaN") {
            output = "Die Matrikelnummer ist ungültig.";
        } else if (await students.countDocuments({ "matrikel": s.matrikel }) == 0) {
            output = "StudentIn mit dieser Matrikelnummer existiert nicht.";
        } else {
            students.deleteOne({ "matrikel": s.matrikel });
            output = "StudentIn mit der Matrikelnummer " + s.matrikel + " gelöscht.";
        }
        return output;
    }
}