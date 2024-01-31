// lab.service.js
const Laboratory = require("@moleculer/lab");

module.exports = {
    mixins: [Laboratory.AgentService],
    settings: {
        token: "moleculer-lab-token",
        apiKey: "B63468Xp-sMB2a9"
    }
};