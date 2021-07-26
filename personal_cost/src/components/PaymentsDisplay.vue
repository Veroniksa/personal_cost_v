<template>
  <div class="payments-list">
    <button @click="toggle">ADD NEW COST +</button>

    <div class="display" v-for="(item, idx) in list" :key="item.id">
      {{ item.id }} {{ item }}
      <span class="menuContext" @click="onContextMenuClick(item, idx)"
        >...</span
      >
    </div>
  </div>
</template>

<script>
export default {
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
