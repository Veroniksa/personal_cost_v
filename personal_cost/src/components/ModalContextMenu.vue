<template>
  <div class="content">
    <!-- <div
      v-for="item in items"
      :key="item.text"
      class="modale__item"
      @click="onClick(item)"
    >
      {{ item.text }}
    </div> -->
    <div>
      <button @click="edit" class="edit">Edit</button>
    </div>
    <div>
      <button class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["settings", "undateSettings"],
  data() {
    return {
      items: [],
      shown: false,
    };
  },
  methods: {
    edit() {
      this.$modal.show("AddPayment", { header: "Add" });
    },
    // onClick(item) {
    //   item.action();
    // },
    /*  setPosition(caller){
            const computed = caller.getBoundingClientRect()
            this.xPos = computed.left
            this.yPos = computed.top
        }, */
  },
  computed: {
    /*         styles(){
            return {
                top: `${this.yPos + 30}px`,
                left: `${this.xPos + 20}px`
            }
        } */
  },

  /*     methods: {
        onEdit(){
            console.log('edit')
        },
        onDelete(){
            console.log('delete')
        }
    }, */
};
</script>

<style scoped lang="scss">
.content {
  position: absolute;
  padding: 5px;
  background: #cafdff;
  cursor: pointer;
}
</style>