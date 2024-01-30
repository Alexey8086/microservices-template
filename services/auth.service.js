// auth.service.js
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const { Pool } = require("pg");
// const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();


// строка подключения в бд (в роли host выступает имя сервиса в docker-compose.yml, а не localhost)
const connectionString = process.env.connectionString || 'postgresql://devuser:devuser@postgres:5432/auth_service_database'
// создание нового пула для взаимодействия с базой данных
const pool = new Pool({
    connectionString,
})


module.exports = {
    name: "auth",
    mixins: [DbService],
    nodeID: "node-auth-service",


    actions: {

        test() {
            return { success: true, message: "Hi from auth login check action !!!" };
        },
        register: {
            params: {
                username: "string",
                email: "string",
                phone: "string",
                password: "string",
            },

            async handler(ctx) {
                // const { username, password } = ctx.params;
                return { success: true, message: "Hi from auth login action" };
            },
        },

        login: {
            params: {
                email: "string",
                password: "string",
            },

            async handler(ctx) {
                // const { username, password } = ctx.params;
                return { success: true, message: "Hi from auth login action" };
            },
        },

        logout: {
            params: {},

            async handler(ctx) {
                return { success: true, message: "Hi from auth logout action" };
            },

        },

        resetpassword: {
            params: {
                email: "string",
                current_password: "string",
                new_password: "string",
            },

            async handler(ctx) {
                // const { username, password } = ctx.params;
                return { success: true, message: "Hi from auth resetpassword action" };
            },
        },

        async getUsers(ctx) {
            try {

                const result = await pool.query('SELECT * FROM users');

                // await pool.end();

                return { success: true, users: result };
            } catch (error) {
                this.logger.error(`AUTH SERVICE - Error gettings records from table USERS:`, error.message);
                throw new ValidationError(`AUTH SERVICE - Error gettings records from table USERS:`, error);
            }
        },
    },

    methods: {

    }
}
