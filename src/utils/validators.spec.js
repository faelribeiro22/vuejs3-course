import { validateEmptyAndEmail, validateEmptyAndLength3 } from "./validators";

describe("Validators utils", () => {
  it("should give an error with empty payload", () => {
    expect(validateEmptyAndLength3()).toBe("*Esse campo é obrigatório");
  });

  it("should pass less 3 return validate", () => {
    expect(validateEmptyAndLength3("12")).toBe(
      "*Esse campo deve ter no mínimo 3 caracteres"
    );
  });

  it("should returns true when input pass a correct param", () => {
    expect(validateEmptyAndLength3("1234")).toBe(true);
  });

  it("should give an error with empty payload email", () => {
    expect(validateEmptyAndEmail()).toBe("*Esse campo é obrigatório");
  });

  it("should give an error with a invalid param", () => {
    expect(validateEmptyAndEmail("teste")).toBe(
      "*Esse campo deve ser um email válido"
    );
  });

  it("should return true when input be a correct param", () => {
    expect(validateEmptyAndEmail("teste@teste.com")).toBe(true);
  });
});
