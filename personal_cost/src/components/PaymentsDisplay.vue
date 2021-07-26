<template>
  <div class="payments-list">
    <button @click="toggle">ADD NEW COST +</button>

    <div class="display" v-for="(item, idx) in list" :key="item.id">
      {{ item.id }} {{ item }}
      <span class="menuContext" @click="onContextMenuClick(item, idx)"
        >...</span
      >
      <!--             <transition name="fade">
            <ModalContextMenu  v-if="editShow" :settingss="modaleSettings"/>
            </transition>
            <button @click="editShow = !editShow">Edit Menu</button> -->
    </div>
  </div>
</template>

<script>
/* import ModalContextMenu from './ModalContextMenu.vue' */
export default {
  /*   components: { ModalContextMenu } ,*/
  name: "PaymentsDisplay",
  props: {
    settings: Object,
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      clientY: "",
      clientX: "",
      /*              editShow: false,
            modaleSettings: {},  */
    };
  },
  methods: {
    toggle() {
      this.$modal.show("AddPayment", { header: "Add" });
    },
    onContextMenuClick(item, idx) {
      this.clientY = event.clientY;
      this.clientX = event.clientX;
      // debugger
      this.$modale.showMenu("ModalContextMenu", {
        header: "testik",
        id: idx,
        x: this.clientX,
        y: this.clientY,
        item: item,
        /*
           const items = [
            { text: "Edit", action: () => {this.actionEdit(item)}},
            { text: "Delete", action: () => {this.actionDelete(item)}},
          ];


        }, 
        actionEdit(item){
          this.clientY = event.clientY;
          this.clientX = event.clientX;
         // debugger 
        this.$modale.showMenu('ModalContextMenu',{
        header: "testik",
        id: item.id,
        x: this.clientX,
        y: this.clientY,
        item: item,
      });
        console.log(item)
           this.$modale.show("ModalContextMenu", {
          item:item,
          id: item.id,
          header: "chenge"
        })   */
        /*          },
         actionDelete(item){
            console.log(item.id)
            this.$store.commit("deletPaymentListData", item.id)
            this.$module.close()
        }  
    
        } */
      });
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
