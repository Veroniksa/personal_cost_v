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
          <td>{{ item.category || item.selected }}</td>
          <td>{{ item.value }}</td>
          <td>
            <template>
              <div class="text-center">
                <v-menu transition="scale-transition" origin="center center"
                style="">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn plain :ripple="false" v-bind="attrs" v-on="on">
                      <div>
                        <v-icon @click.self="onContextMenuClick(item, item.id)"
                          >mdi-format-list-bulleted-square
                        </v-icon>
                      </div>
                    </v-btn>
                  </template>
                  <v-list>
                    <modal-context-menu 
                      v-if="undateSettings.name"
                      :setting="undateSettings"
                      :undateSettings="undateSettings"
                      />
                  </v-list>
                </v-menu>
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import ModalContextMenu from "./ModalContextMenu.vue";
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
      this.$modale.showMenu("ModalContextMenu", {
        header: "testik",
        id: id,
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
  beforeDestroy() {
    this.$modale.EventBus.$off("showMenu", this.onItemsShow);
  },
};
</script>
