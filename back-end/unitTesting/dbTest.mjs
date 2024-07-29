import { default as test, describe, it } from "node:test";
import mongoose, { Mongoose } from "mongoose";
import { expect } from "chai";

describe("MongoDB connection", () => {
    it("Should connect to MongoDB", async function() {
        let connection;
        async function connect(){
            console.log("Connecting to MongoDB");
            await mongoose.connect("mongodb+srv://seanhigginslim:Ua91ORk0vuemydwX@reportgenerator.qfbe4th.mongodb.net/");
            return mongoose.connection.readyState;
        };

        connection = await connect();
        expect(connection).to.equal(1);
    });
});