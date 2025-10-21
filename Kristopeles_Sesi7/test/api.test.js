// test/api.test.js

const { expect } = require("chai");
const axios = require("axios");

// Membuat instance axios agar tidak perlu mengulang URL dan header
const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

describe("API Automation Test for Reqres.in", () => {
  
  it("GET: should get user list successfully", async () => {
    const response = await apiClient.get("/users?page=1");

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("data");
  });

  it("POST: should create user successfully", async () => {
    const newUser = {
      name: "Kristopeles",
      job: "QA Engineer",
    };
    const response = await apiClient.post("/users", newUser);

    expect(response.status).to.equal(201);
    expect(response.data).to.have.property("name", "Kristopeles");
  });

  it("PATCH: should update user successfully", async () => {
    const updatedUser = {
      name: "Raja",
      job: "Senior QA Engineer",
    };
    const response = await apiClient.patch("/users/2", updatedUser);

    expect(response.status).to.equal(200);
    // Perbaikan: Assertion harus memeriksa data yang dikirim
    expect(response.data).to.have.property("name", "Raja");
  });

  it("DELETE: should delete user successfully", async () => {
    const response = await apiClient.delete("/users/2");

    expect(response.status).to.equal(204);
  });
  
});