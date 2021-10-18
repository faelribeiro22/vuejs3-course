import useStore from "../hooks/useStore";
import {
  cleanCurrentUser,
  resetUserStore,
  setApiKey,
  setCurrentUser,
} from "./user.js";

describe("User Store", () => {
  afterEach(() => {
    resetUserStore();
  });

  it("should set current user", () => {
    const store = useStore();
    setCurrentUser({ name: "Teste" });
    expect(store.User.currentUser.name).toBe("Teste");
  });

  it("should set api_key on current user", () => {
    const store = useStore();
    setApiKey("123");
    expect(store.User.currentUser.apiKey).toBe("123");
  });

  it("should clean current user", () => {
    const store = useStore();
    setCurrentUser({ name: "Teste" });
    expect(store.User.currentUser.name).toBe("Teste");
    cleanCurrentUser();
    expect(store.User.currentUser.name).toBeFalsy();
  });
});
