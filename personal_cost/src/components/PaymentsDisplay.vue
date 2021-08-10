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
        <td>
          <v-dialog v-model="shown" width="500">
            <template v-slot:activator="{on}">
              <v-btn plain :ripple="false" 
              v-on="on">
                <div>
                  <v-icon @click.self="onContextMenuClick(item, item.id)">mdi-format-list-bulleted-square
                  </v-icon>
                </div>
              </v-btn>
            </template>
            <v-card>
        <AddPayment @addNewPayment="addData" 
        @close="onClose"
        v-if="modalSettings.name"
        :settings="modalSettings"
        :undateSettings="undateSettings"
        />
      </v-card>
            <v-card>
              <ModalContextMenu 
              v-if="undateSettings.name"
              :setting="undateSettings"
              :undateSettings="undateSettings"
             /> <!-- :style="{
                top: `${this.undateSettings.y + 5}px`,
                left: `${this.undateSettings.x - 80}px`,
              }" -->
            </v-card>
            <v-btn @click="shown=false" plain>Close</v-btn>
          </v-dialog>
          </td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
</template>

<script>
import ModalContextMenu from './ModalContextMenu.vue';
export default {
  components: { ModalContextMenu },
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
      shown: false,
      modalSettings: {},
      undateSettings: {},
      clientY: "",
      clientX: "",
    };
  },
  methods: {
    onContextMenuClick(item, id) {
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
    onShown(settings) {
      this.modalSettings = settings;
      //console.log(settings)
    },
    onHide() {
      this.modalSettings = {};
    },
    onItemsShow(items) {
      this.undateSettings = items;
    },
    onItemsHide() {
      this.undateSettings = {};
    },
  },
  mounted() {
    this.$modale.showMenu();
    this.$modale.EventBus.$on("showMenu", this.onItemsShow);
    },
  beforeDestroy(){
    this.$modale.EventBus.$off("showMenu", this.onItemsShow);
    }
};
</script>
