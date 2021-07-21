import { reactive } from "@vue/reactivity";

const state = reactive({
  currentUser: {},
});

export default state;

export function cleanCurrentUser() {
  state.currentUser = {};
}

export function setCurrentUser(user) {
  state.currentUser = user;
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey };
  state.currentUser = currentUser;
}
