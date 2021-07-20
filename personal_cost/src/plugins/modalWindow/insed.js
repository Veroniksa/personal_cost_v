export default {
    install(Vue){
        if(this.installed){
            return
        }
    this.installed = true;

    Vue.prototype.$modale = {
        EventBus: new Vue(),

        edit(name, settingss) {
            this.EventBus.$emit('edit', {name, ...settingss});
        },

        delete() {
            this.EventBus.$emit('delete');
        }
    };
    }
};