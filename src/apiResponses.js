function respond(req, res, status, content) {
    const str = JSON.stringify(content);

    res.writeHead(status, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(str, "utf8")
    });
    res.write(str);
    res.end();
}

function notFound(req, res) {
    const status = 404;
    const content = {
        message: "The page you are looking for was not found",
        id: "notFound"
    };

    respond(req, res, status, content);
}

module.exports = {
    notFound
}
