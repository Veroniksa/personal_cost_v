<template>
    <div class="payments-list">
        <div v-for="(item, idx) in list" 
        :key="idx">
            {{ item.id }}  {{ item }}
            <ModalContextMenu @click="closeEdit" v-if="editShow"/>
            <button @click="editShow = !editShow">Edit Menu</button>
        </div>
    </div>
</template>

<script>
import ModalContextMenu from './ModalContextMenu.vue'
export default {
  components: { ModalContextMenu },
    name: "PaymentsDisplay",
    props: {
      list: {
          type: Array,
          default: () =>[]
      }
    },
    data () {
        return {
            editShow: false
        }
    },
    methods: {
        closeEdit(){
            this.editShow = false
        },
        onClicked(){
            console.log('edit')
        }
    }
}
</script>

<style lang="scss">

</style>