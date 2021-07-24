<template>
    <div class="payments-list">
        <div v-for="item in list" 
        :key="item.id">
            {{ item.id }}  {{ item }}
            <span class="menuContext" @click="onContextMenuClick($event, item)">...</span>
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
          default: () =>[]
      }
    },
    data () {
        return {
/*              editShow: false,
            modaleSettings: {},  */
        }
    },
    methods: {
        onContextMenuClick(event, item) {
          const items = [
            { text: "Edit", action: () => {this.actionEdit(item)}},
            { text: "Delete", action: () => {this.actionDelete(item)}},
          ];
          this.$modale.show({event,items});
        },
        actionEdit(item){
         // debugger 
        this.$modal.show('AddPayment',{header:"Add", edetedValue:item})
        console.log(item)
/*           this.$modale.show("ModalContextMenu", {
          item:item,
          id: item.id,
          header: "chenge"
        })   */
         },
         actionDelete(item){
            console.log(item.id)
            this.$store.commit("deletPaymentListData", item.id)
            this.$module.close()
        }  
    
        }
    
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>