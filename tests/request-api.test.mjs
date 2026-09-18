import assert from "node:assert/strict";
import test from "node:test";

test("stores a valid consultation request", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let inserted;

  const response = await worker.fetch(
    new Request("http://localhost/api/requests", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Тест MVP",
        contact: "test@example.invalid",
        question: "Проверка формы",
      }),
    }),
    {
      DB: {
        prepare(sql) {
          return {
            bind(...values) {
              inserted = { sql, values };
              return { run: async () => ({ success: true }) };
            },
          };
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 201);
  assert.equal(inserted.values[0], "Тест MVP");
  assert.equal(inserted.values[1], "test@example.invalid");
  assert.match(inserted.sql, /INSERT INTO consultation_requests/);
});

test("rejects an incomplete consultation request", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-invalid`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/api/requests", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "А", contact: "" }),
    }),
    { DB: { prepare() { throw new Error("Database should not be called"); } } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 400);
});
