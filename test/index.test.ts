import { Category, Order, searchOllamaModels } from "../src/index";

describe("searchOllamaModels", () => {
  beforeEach(() => {
    // Clear all mocks between tests
    jest.clearAllMocks();
  });

  it("should make a request with no parameters", async () => {
    const models = await searchOllamaModels();
    console.log(models);

    expect(models.length).toBeGreaterThan(0);
    expect(models.every((model) => model.name)).toBeTruthy();
    expect(models.every((model) => model.description)).toBeTruthy();
    expect(models.every((model) => model.pulls)).toBeTruthy();
    expect(models.every((model) => model.updated)).toBeTruthy();
    expect(models.every((model) => model.versions)).toBeTruthy();
    expect(models.every((model) => model.url)).toBeTruthy();
  });

  it("should make a request with a category", async () => {
    const models = await searchOllamaModels({
      categories: [Category.Thinking],
    });

    console.log(models);
    expect(models.length).toBeGreaterThan(0);
  });

  it("should not return invalid models", async () => {
    // I manually checked that this query returns an element that is not a model
    const models = await searchOllamaModels({ query: "asd13452/minecraft" });
    console.log(models);

    expect(models.length).toBe(0);
  });

  it("should not return any models", async () => {
    const models = await searchOllamaModels({
      query: "asd13452/minecraft",
      order: Order.Newest,
      categories: [Category.Thinking, Category.Embedding, Category.Vision],
    });
    console.log(models);

    expect(models.length).toBe(0);
  });

  it("should make a request with an order", async () => {
    const models = await searchOllamaModels({ order: Order.Newest });
    console.log(models);

    expect(models.length).toBeGreaterThan(0);
  });
});
