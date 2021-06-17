"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P3_4 = void 0;
const Mongo = require("mongodb");
const Http = require("http");
const Url = require("url");
var P3_4;
(function (P3_4) {
    let mongoURL = "mongodb+srv://user:test1234@qlu.qvisc.mongodb.net/3_4?retryWrites=true&w=majority";
    let db = "3_4";
    let col = "students";
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        console.log("[Request] from " + _request.socket.remoteAddress + " (" + _request.headers["x-forwarded-for"] + ")");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let s = { fname: url.query.fname + "", lname: url.query.lname + "", matrikel: parseInt(url.query.matrikel + ""), studiengang: url.query.studiengang + "" };
            if (url.pathname == "/send") {
                let response = await sendData(s);
                _response.write(response);
            }
            if (url.pathname == "/receive") {
                let response = await receiveData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/del") {
                let response = await deleteData(s);
                _response.write(response);
            }
            _response.end();
        }
    }
    async function connectDB() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(mongoURL, options);
        await mongoClient.connect();
        let students = mongoClient.db(db).collection(col);
        return students;
    }
    async function sendData(s) {
        let students = await connectDB();
        let output = "";
        if (s.matrikel + "" == "NaN") {
            output = "Die Matrikelnummer ist ungültig.";
        }
        else if (await students.countDocuments({ "matrikel": s.matrikel }) != 0) {
            output = "StudentIn mit dieser Matrikelnummer existiert bereits.";
        }
        else {
            students.insertOne(s);
            output = "StudentIn '" + s.fname + "' (" + s.matrikel + ") " + "hinzugefügt.";
        }
        return output;
    }
    async function receiveData() {
        let students = await connectDB();
        let cursor = students.find();
        let result = await cursor.toArray();
        return result;
    }
    async function deleteData(s) {
        let students = await connectDB();
        let output = "";
        if (s.matrikel + "" == "NaN") {
            output = "Die Matrikelnummer ist ungültig.";
        }
        else if (await students.countDocuments({ "matrikel": s.matrikel }) == 0) {
            output = "StudentIn mit dieser Matrikelnummer existiert nicht.";
        }
        else {
            students.deleteOne({ "matrikel": s.matrikel });
            output = "StudentIn mit der Matrikelnummer " + s.matrikel + " gelöscht.";
        }
        return output;
    }
})(P3_4 = exports.P3_4 || (exports.P3_4 = {}));
//# sourceMappingURL=server.js.map