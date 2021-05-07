import { handleSubmit } from "../client/js/formHandler";
describe('Testing, "handleSubmit()" toBeDefined', () => {
  test("return true", async () => {
    expect(handleSubmit).toBeDefined();
  });
});
