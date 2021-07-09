"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P3_4 = void 0;
const Mongo = require("mongodb");
const Http = require("http");
const Url = require("url");
var P3_4;
(function (P3_4) {
    let mongoURL = "mongodb+srv://user:test1234@qlu.qvisc.mongodb.net/end?retryWrites=true&w=majority";
    let db = "end";
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
        let ip = _request.headers["x-forwarded-for"] + "";
        let address = _request.socket.remoteAddress + "";
        console.log("[Connect-Request] from " + ip + " (" + address + ")");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/sendscore") {
                console.log("[SendScore-Request] from " + ip);
                let s = { name: url.query.name + "", id: url.query.id + "", time: url.query.time + "", date: url.query.date + "", first: url.query.first + "", ip: ip, address: address };
                let response = await sendScoreData(s);
                _response.write(response);
            }
            if (url.pathname == "/receivescores") {
                console.log("[ReceiveScore-Request] from " + ip);
                let response = await receiveScoreData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/sendlink") {
                console.log("[SendLink-Request] from " + ip);
                let l = { link: url.query.link + "", name: url.query.name + "", date: url.query.date + "", ip: ip, address: address };
                let response = await sendLinkData(l);
                _response.write(response);
            }
            if (url.pathname == "/receivegamelink") {
                console.log("[ReceiveGameLink-Request] from " + ip);
                let response = await receiveLinkData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/receiveadminlink") {
                console.log("[ReceiveAdminLink-Request] from " + ip);
                let response = await receiveLinkData();
                _response.write(JSON.stringify(response));
            }
            if (url.pathname == "/deletelink") {
                console.log("[DeleteLink-Request] from " + ip);
                let l = { link: url.query.link + "", name: url.query.name + "", date: url.query.date + "", ip: ip, address: address };
                let response = await deleteLinkData(l);
                _response.write(response);
            }
            _response.end();
        }
    }
    async function connectScoreDB() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(mongoURL, options);
        await mongoClient.connect();
        let col = "scores";
        let scores = mongoClient.db(db).collection(col);
        return scores;
    }
    async function connectLinkDB() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(mongoURL, options);
        await mongoClient.connect();
        let col = "links";
        let links = mongoClient.db(db).collection(col);
        return links;
    }
    async function sendScoreData(s) {
        let scores = await connectScoreDB();
        let output = "";
        if (await scores.countDocuments({ "id": s.id }) != 0) {
            if (s.first == "false") {
                console.log("Insert successful: Name: '" + s.name + "' ID: '" + s.id + "' Time: " + s.time + " First: " + s.first);
                scores.insertOne(s);
                output = "true";
            }
            else {
                console.log("Insert failed: ID already in Database");
                output = "false";
            }
        }
        else {
            console.log("Insert successful: Name: '" + s.name + "' ID: '" + s.id + "' Time: " + s.time + " First: " + s.first);
            scores.insertOne(s);
            output = "true";
        }
        return output;
    }
    async function receiveScoreData() {
        let scores = await connectScoreDB();
        let cursor = scores.find();
        let result = await cursor.toArray();
        return result;
    }
    async function sendLinkData(l) {
        let links = await connectLinkDB();
        let output = "";
        if (await links.countDocuments({ "link": l.link }) != 0) {
            console.log("Insert failed: URL already in Database");
            output = "false";
        }
        else {
            console.log("Insert successful: Name: '" + l.name + "' URL: " + l.link);
            links.insertOne(l);
            output = "true";
        }
        return output;
    }
    async function receiveLinkData() {
        let links = await connectLinkDB();
        let cursor = links.find();
        let result = await cursor.toArray();
        return result;
    }
    async function deleteLinkData(l) {
        let links = await connectLinkDB();
        let output = "";
        if (await links.countDocuments({ "link": l.link }) == 0) {
            console.log("Someone is trying to delete something that isn't there.");
            output = "Bild-URL wurde nicht gefunden.";
        }
        else {
            console.log("Image removed: '" + l.name + "' URL: " + l.link);
            links.deleteOne({ "link": l.link });
            output = "Das Bild " + l.name + " wurde entfernt.";
        }
        return output;
    }
})(P3_4 = exports.P3_4 || (exports.P3_4 = {}));
//# sourceMappingURL=server.js.map