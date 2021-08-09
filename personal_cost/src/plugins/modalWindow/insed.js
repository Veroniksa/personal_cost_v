export default {
  install(Vue) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    Vue.prototype.$modale = {
      EventBus: new Vue(),

      showMenu(name, settings) {
        this.EventBus.$emit("showMenu", {
          name,
          ...settings
        });
      },

      closeMenu() {
        this.EventBus.$emit("closeMenu");
      },
    };
  }
};