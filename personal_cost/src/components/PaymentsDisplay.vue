<template>
    <div class="payments-list">
        <div v-for="(item, idx) in list" 
        :key="idx">
            {{ item.id }}  {{ item }}
            <ModalContextMenu  v-if="editShow" :settingss="modaleSettings"/>
        </div>
    </div>
</template>

<script>
import ModalContextMenu from './ModalContextMenu.vue'
export default {
  components: { ModalContextMenu },
    name: "PaymentsDisplay",
    props: {
        settingss: Object,
      list: {
          type: Array,
          default: () =>[]
      }
    },
    data () {
        return {
             editShow: false,
            modaleSettings: {}, 
        }
    },
    methods: {
         closeEdit(){
            this.editShow = false
        },
        onClicked(){
            console.log('edit')
        },
        onEdit(settingss){
            this.modaleSettings = settingss
            console.log(settingss)
        },
        onDelete(){
            this.modaleSettings = {}
        } 
    },
    mounted(){
         this.$modale.EventBus.$on('edit', this.onEdit)
        this.$modale.EventBus.$on('delete', this.onDelete) 
    },
    beforeDestroy(){
         this.$modale.EventBus.$off('edit', this.onEdit)
        this.$modale.EventBus.$off('delete', this.onDelete) 
    }
}
</script>

<style lang="scss">

</style>