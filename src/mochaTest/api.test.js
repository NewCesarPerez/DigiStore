import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
let request;

describe("Main Mocha Suite: API RestFull testing", () => {
  before(() => {
    request = supertest("http://localhost:3000");
  });
  describe("Unknown suite", () => {
    describe("Get unknown url", () => {
      it("Should return 404 status response", async () => {
        const response = await request.get("/noexiste");

        expect(response.status).to.eql(404);
      });
    });
  });
  describe("Product suite", () => {
    describe("get-products", () => {
      it("Should return 200 status response and an object", async () => {
        const response = await request.get("/api/productos");
        expect(response.status).to.eql(200);

        //expect(response.data).to.be.an("array");
      });
    });
    describe("post-product", () => {
      it("Should return 200 status response and an object with the created product", async () => {
        const productToPost = null; // mock product to be provided to post user end point
        const response = await request
          .post("/api/productos")
          .send(productToPost);
        expect(response.status).to.eql(200);
        //expect(response.body.data).to.be.an("object");
      });
      //insert ID manually
      describe("update-product", () => {
        it("Should return 200 status response", async () => {
          const productToUse = null;
          const response = await request
            .put("/api/productos/63518373d5049075b3bc7223")
            .send(productToUse);

          expect(response.status).to.eql(200);
        });
      });
      //insert ID manually
      describe("delete-product", () => {
        it("Should return 200 status response", async () => {
          const res = await request.delete(
            "/api/productos/63518373d5049075b3bc7223"
          );

          expect(res.status).to.eql(200);
        });
      });
    });
  });
});
