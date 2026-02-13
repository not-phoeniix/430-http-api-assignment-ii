const users = {};

function respond(req, res, status, content) {
    const str = JSON.stringify(content);

    res.writeHead(status, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(str, "utf8")
    });

    // HEAD requests and update codes (204) don't get a response body
    if (req.method !== "HEAD" && status !== 204) {
        res.write(str);
    }

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

function getUsers(req, res) {
    const status = 200;
    respond(req, res, status, { users });
}

function addUser(req, res, body) {
    const { name, age } = body;
    users[name] = { name, age };

    respond(req, res, 201, {
        message: "Created Successfully"
    });
}

module.exports = {
    notFound,
    getUsers,
    addUser,
}
