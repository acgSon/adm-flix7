import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

// Aqui tem testes de integração, pois não faz sentido criar mais um arquivo
// Pois se torna burocrático
describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    // as any pois validate é um método privado - ts reclama
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    // garante que o método validate está sendo chamado
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in constructor", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const uuid = "2a5beb3b-ecd7-44e2-9d59-237a352b7d85";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in constructor", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy;
    expect(validateSpy).toHaveBeenCalled();
  });
});
