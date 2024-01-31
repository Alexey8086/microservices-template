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
        enabled: false,
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
            type: "Jaeger",
            options: {
                // HTTP Reporter endpoint. If set, HTTP Reporter will be used.
                endpoint: null,
                // UDP Sender host option.
                host: "jaeger-agent",
                // UDP Sender port option.
                port: 6832,
                // Jaeger Sampler configuration.
                sampler: {
                    // Sampler type. More info: https://www.jaegertracing.io/docs/1.14/sampling/#client-sampling-configuration
                    type: "Const",
                    // Sampler specific options.
                    options: {}
                },
                // Additional options for `Jaeger.Tracer`
                tracerOptions: {},
                // Default tags. They will be added into all span tags.
                defaultTags: null
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
