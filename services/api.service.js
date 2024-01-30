// api.service.js
const ApiGateway = require("moleculer-web");
const dotenv = require("dotenv")

dotenv.config()

module.exports = {
	name: "api",
	mixins: [ApiGateway],
	nodeID: "node-api-service",

	settings: {
		port: process.env.PORT_API_SERVICE || 8000,
		cors: true,

		routes: [
			{
				path: "/api",
				use: [],
				// authorization: false,
				aliases: {

					"POST auth/login": "auth.login",
					"POST auth/logout": "auth.logout",
					"POST auth/resetpassword": "auth.resetpassword",
					"GET auth/users": "auth.getUsers",

					"GET auth/test": "auth.test",

				},

				bodyParsers: {
					json: true,
					urlencoded: { extended: true }
				}
			},
		],
	},

	onError(req, res, err) {
		// Return with the error as JSON object
		res.setHeader("Content-type", "application/json; charset=utf-8");
		res.writeHead(err.code || 500);

		if (err.code == 422) {
			let o = {};
			err.data.forEach(e => {
				let field = e.field.split(".").pop();
				o[field] = e.message;
			});

			res.end(JSON.stringify({ errors: o }, null, 2));
		} else {
			const errObj = _.pick(err, ["name", "message", "code", "type", "data"]);
			res.end(JSON.stringify(errObj, null, 2));
		}
		this.logResponse(req, res, err ? err.ctx : null);
	}

};
