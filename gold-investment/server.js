// import Node.js built in modules
import http from "node:http"  // for creating the web server
import path from "node:path"  // for resolving file paths
import fs from "node:fs/promises"  // to read files asynchronously using promises

// choose a port to listen on
const PORT = 5500;

// create a http server that handles every incoming request 
const server = http.createServer(async (req, res) => {

    if (req.url === "/invest" && req.method === "POST") {
        let body = "";

        for await(const chunk of req) {
            body += chunk;
        }

        const parsed = JSON.parse(body);
        const log = `User invested $${parsed.amount} at ${new Date().toISOString()}\n`;

        await fs.appendFile("purchases.txt", log); // <- this creates or appends to the file

        res.statusCode = 201;
        res.end("Purchase logged!");
        return;
    }
    
    if (req.url === "/sse" && req.method === "GET") {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive")

        const sendPrice = () => {
            const price = (1800 + Math.random() * 200).toFixed(2);  // simulated price
            res.write(`data: ${price}\n\n`);
        }

        sendPrice();  // send the first price immediately
        const intervalId = setInterval(sendPrice, 3000); // then every 3s

        req.on("close", () => {
            clearInterval(intervalId);  // clean up when the browser closes the connection
        });

        return;  // exit early so server doesnt keep going
    }

    try {
        let filePath = req.url === "/" ? "/index.html" : req.url;  // if the request is for the root path "/", serve "index.html" if not serve the regular url
        const fullPath = path.join(process.cwd(), "public", filePath);  // build the full path to the requested file inside the "public" folder create fullPath with current working directory /public /filepath
        const content = await fs.readFile(fullPath);  // read the file contents from disk
        const contentType = getContentType(filePath);  // get the right content type based on the file extension
        
        res.statusCode = 200;  // respond to the browser with status code 200
        res.setHeader("Content-Type", contentType);  // set the correct headers
        res.end(content);  // send final message

        } catch (err) {  // if the file was not found or theres an error respond with 404
        console.error("404 Not Found:". err.message);
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain")
        res.end("404 Not Found");
    }
})

// start the serves and listen on the given port
// server.listen tells Node to start accepting connections
// the callback logs once the server is ready
// your browser can now visit http://localhost:5500
server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));

// determines the correct mime type to send in the response header
function getContentType(url) {
    const ext = path.extname(url)
    switch(ext) {
        case ".css":
            return "text/css"
        case ".js":
            return "application/javascript"
        case ".png":
            return "image/png"
        case ".html":
        default:
            return "text/html"
    }
}