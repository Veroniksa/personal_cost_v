<template>
  <v-container class="content">
    <v-col>
      <v-btn @click="edit" class="edit"
        ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
      >
    </v-col>
    <v-col>
      <v-btn @click="deleted" class="delete"
        ><v-icon left>mdi-minus-circle</v-icon>Delete</v-btn
      >
    </v-col>
  </v-container>
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
    deleted() {
      this.$store.commit("deletPaymentListData", this.undateSettings.id);
      //parte erore
    },
    edit() {
      this.$modal.show("AddPayment", { header: "Add", modalShown: true });
    },
    onItemsShow(items) {
      this.undateSettings = items;
    },
    onItemsHide() {
      this.undateSettings = {};
    },
  },
};
</script>
