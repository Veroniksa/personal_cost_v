<template>
<div class="content" :style="styles">
          <div v-for="item in items" 
          :key="item.text" 
          class="modale__item" 
          @click="onClick(item)">
          {{item.text}}
      </div>
<!--     <div>
        <button @click="onEdit" class="edit">Edit</button>
    </div>
    <div>
        <button @click="onDelete" class="delete">Delete</button>
    </div> -->
</div>
</template>

<script>
export default {
    props: ["settings"],
        data () {
        return {
            items: [],
            shown: false,
        }
    },
        methods: {
        onClick(item){
            item.action()
        },
        onShow({ items }) {
            this.items = items,
            this.shown = true
            //this.setPosition (caller)
        },
       /*  setPosition(caller){
            const computed = caller.getBoundingClientRect()
            this.xPos = computed.left
            this.yPos = computed.top
        }, */
        onClose(){
            this.items = [],
            this.shown = false
        }
    },
    computed: {
/*         styles(){
            return {
                top: `${this.yPos + 30}px`,
                left: `${this.xPos + 20}px`
            }
        } */
    },
    mounted(){
        this.$modale.EventBus.$on('shown', this.onShow)
        this.$modale.EventBus.$on('close', this.onClose)
    },
    beforeDestroy(){
        this.$modale.EventBus.$off('shown', this.onShow)
        this.$modale.EventBus.$off('close', this.onClose)
    }
/*     methods: {
        onEdit(){
            console.log('edit')
        },
        onDelete(){
            console.log('delete')
        }
    }, */
}
</script>

<style scoped lang="scss">
.content{
    position: absolute;
    padding: 5px;
    background: #cafdff;
    cursor: pointer;
}
</style>