const users = {};

function respond(req, res, status, content) {
    let str = undefined;
    if (content) {
        str = JSON.stringify(content);
    }

    res.writeHead(status, {
        "Content-Type": "application/json",
        "Content-Length": str ? Buffer.byteLength(str, "utf8") : 0
    });

    // HEAD requests, empty content, and update codes (204) don't get a response body
    if (str !== undefined && req.method !== "HEAD" && status !== 204) {
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

    // default to bad request code
    let response = {
        message: "Name and age are both required!",
        id: "addUserMissingParams"
    };
    let status = 400;

    // update an existing user
    if (name && users[name] && age !== undefined) {
        users[name].age = age;
        status = 204;
        response = undefined;
    }

    // create a new user
    if (name && !users[name] && age !== undefined) {
        users[name] = { name, age };
        status = 201;
        response.message = "Created successfully!";
        response.id = undefined;
    }

    respond(req, res, status, response);
}

module.exports = {
    notFound,
    getUsers,
    addUser,
}
