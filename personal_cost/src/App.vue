<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
    </header>
    <div class="menu">
      <router-link to="/dashboard">Dashboard</router-link> /
      <router-link to="/about">About</router-link>
    </div>
    <main>
      <div class="content-page">
        <router-view></router-view>
      </div>
      <br />

      
      <transition name="fade">
        <modal-window
          @close="onClose"
          v-if="modalSettings.name"
          :settings="modalSettings"
          :undateSettings="undateSettings"
        />
      </transition>

      <transition name="fade">
        <modal-context-menu
          :setting="undateSettings"
          :undateSettings="undateSettings"
          v-if="undateSettings.name"
          :style="{
            top: `${this.undateSettings.y + 5}px`,
            left: `${this.undateSettings.x - 80}px`,
          }"
        />
      </transition>
    </main>
  </div>
</template>


<script>
import ModalContextMenu from "./components/ModalContextMenu.vue";

export default {
  name: "App",
  components: {
    ModalWindow: () =>
      import(
        /* webpackChunkName: 'ModalWindow'*/ "./components/ModalWindow.vue"
      ),
    ModalContextMenu /* : ()=>import('./components/ModalContextMenu.vue') */,
  },
  data() {
    return {
      settings: {
        header: "AddPayment",
        content: "addPaymentForm",
      },
      modalShown: false,
      modalSettings: {},
      undateSettings: {},
    };
  },
  methods: {
    onShown(settings) {
      this.modalSettings = settings;
      //console.log(settings)
    },
    onHide() {
      this.modalSettings = {};
    },
    onItemsShow(items) {
      this.undateSettings = items;
    },
    onItemsHide() {
      this.undateSettings = {};
    },
  },
  mounted() {
/*     const page = this.$route.params.page || 1;
    this.curPage = Number(page); */
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
    this.$modale.EventBus.$on("showMenu", this.onItemsShow);
    this.$modale.EventBus.$on("closeMenu", this.onItemsHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
    this.$modale.EventBus.$off("showMenu", this.onItemsShow);
    this.$modale.EventBus.$off("closeMenu", this.onItemsHide);
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  background: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    background: linear-gradient(45deg, white, transparent);
  }
  button {
    border-radius: 5px;
    background: darkturquoise;
    color: white;
    border: none;
  }
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>