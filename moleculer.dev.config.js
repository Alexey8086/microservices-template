"use strict";

module.exports = {
    nodeID: 'Unique',
    namespace: "",
    metadata: {},

    logger: true,
    logLevel: "debug",
    transporter: null,
    cacher: "MemoryLRU",


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
