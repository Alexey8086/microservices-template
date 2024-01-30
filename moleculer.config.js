"use strict";
const os = require("os");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	nodeID: (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
	namespace: "",
	metadata: {},

	logger: true,
	logLevel: "debug",

	// transporter: null,clear
	transporter: process.env.TRANSPORTER || 'amqp://rabbitmq-server:5672',

	// transporter: {
	//     type: "AMQP",
	//     options: {
	//         url: "amqp://rmuser:rmpassword@rabbitmq-server:5672",
	//         eventTimeToLive: 5000,
	//         prefetch: 1,
	//         socketOptions: {
	//             servername: process.env.RABBIT_SERVER_NAME || 'rabbitmq'
	//         },
	//         // If true, queues will be autodeleted once service is stopped, i.e., queue listener is removed
	//         autoDeleteQueues: true
	//     }
	// },

	cacher: process.env.CACHER || "redis://redis-server:6379",


	metrics: {
		enabled: true,
		reporter: {
			type: "Prometheus",
			options: {
				port: process.env.PORT1_PROMETHEUS || 9090,
				path: "/metrics",
				defaultLabels: registry => ({
					namespace: registry.broker.namespace,
					nodeID: registry.broker.nodeID
				})
			}
		}
	},

	serializer: "JSON",
	validator: true,

	tracking: {
		enabled: true,
		shutdownTimeout: 5000,
	},

	tracing: {
		enabled: true,
		exporter: {
			type: "Console", // Console exporter is only for development!
			options: {
				logger: null,
				colors: true,
				width: 100,
				gaugeWidth: 40
			}
		}
	},

	errorHandler(err, info) {
		this.logger.warn("Log the error:", err);
		throw err; // Throw further
	},

	// Called after broker created.
	created(broker) {

	},

	// Called after broker started.
	async started(broker) {

	},

	// Called after broker stopped.
	async stopped(broker) {

	}
};
