import mongoose from "mongoose";

describe("Route users", () => {

    const newUser = {
        name:"Aurelio",
        email:"abuarquemf@gmail.com",
        password:"vaca",
        favouriteColor:"Black",
        _id: null
    };

    beforeEach(done => {
        mongoose.connect("mongodb://animal505:vaca505@ds123919.mlab.com:23919/article-in-test");
        done();
    });

    describe("Route POST /users", () => {
        it("should create a new user", done => {
            request.post("/users")
            .send(newUser)
            .expect(201)
            .end((err, res) => {
                expect(res.body.name).to.be.eql(newUser.name);
                expect(res.body.email).to.be.eql(newUser.email);
                expect(res.body.password).to.be.eql(newUser.password);
                expect(res.body._id).to.not.be.eql(null);
                newUser._id = res.body._id;
                done(err);
            });
        });
    });

    describe("Route POST /users/:id/history", () => {
        const historyRequestBody = {
            jobInfo: {
        		job:"CTO",
        		company:"Engapp"
        	},
            favouriteBand1:"The Beatles",
            favouriteBand2:"Arctic Monkeys"
        };
        it("should get user history", done => {
            request.post(`/users/${newUser._id}/history`)
            .send(historyRequestBody)
            .expect(200)
            .end((err, res) => {
                expect(res.body.history).to.not.be.eql(null);
                done(err);
            });
        });
    });

    describe("Route GET /users", () => {
        it("should not get an empty list of users", done => {
            request.get("/users").end((err, res) => {
                expect(res.body).to.not.be.eql([]);
                done(err);
            });
        });
    });

    afterEach(done => {
        mongoose.connection.close();
        done();
    });
});
