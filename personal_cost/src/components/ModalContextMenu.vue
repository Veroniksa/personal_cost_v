<template>
  <div class="content">
    <div>
      <button @click="edit" class="edit"><v-icon left>mdi-pencil</v-icon>Edit</button>
    </div>
    <div>
      <button @click="deleted" class="delete"><v-icon left>{{ icons.mdiDelete }}</v-icon>Delete</button>
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
    deleted(){
      this.$store.commit('deletPaymentListData', this.undateSettings.id)
    },
    edit() {
      this.$modal.show("AddPayment", { header: "Add" });
    },
  },
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