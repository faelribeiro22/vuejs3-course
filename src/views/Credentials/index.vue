<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>
      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="
          flex
          py-3
          pl-5
          mt-2
          rounded
          justify-between
          items-center
          bg-brand-gray
          w-full
          lg:w-1/2
        "
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-5" v-if="!state.hasError">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="
          py-3
          pl-5
          pr-20
          rounded
          bg-brand-gray
          w-full
          lg:w-2/3
          overflow-x-scroll
        "
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else>
&lt;script src="https://faelribeiro22-feedbacker-widget.netlify.app?api_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from "@/components/HeaderLogged";
import ContentLoader from "@/components/ContentLoader";
import Icon from "@/components/Icon";
import useStore from "@/hooks/useStore";
import palette from "../../../palette";
import { reactive } from "@vue/reactivity";
import services from "@/services";
import { setApiKey } from "@/store/user";
import { watch } from "@vue/runtime-core";

export default {
  components: { HeaderLogged, Icon, ContentLoader },
  setup() {
    const store = useStore();
    const state = reactive({
      isLoading: false,
      hasError: false,
    });

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
          handleError(true);
        }
      }
    );

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true;
        console.log("aquiii", services.users.generateApiKey());
        const { data } = await services.users.generateApiKey();

        setApiKey(data.apiKey);
        state.isLoading = false;
      } catch (error) {
        handleError(error);
      }
    }

    function handleError(error) {
      console.log("error", error);
      state.isLoading = false;
      state.hasError = !!error;
    }

    return {
      store,
      state,
      brandColors: palette.brand,
      handleGenerateApiKey,
    };
  },
};
</script>
