<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Date</th>
          <th class="text-left">Category</th>
          <th class="text-left">Value</th>
          <th></th>
        </tr>
      </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ (item.category) || (item.selected) }}</td>
        <td>{{ item.value }}</td>
        <td><div plain :ripple="false"><v-icon @click.self="onContextMenuClick(item, item.id)">mdi-format-list-bulleted-square</v-icon></div></td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
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
    onContextMenuClick(item, id) {
      debugger
      this.clientY = event.clientY;
      this.clientX = event.clientX;
      // debugger
      this.$modale.showMenu("ModalContextMenu", {
        header: "testik", 
        id: id,
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
