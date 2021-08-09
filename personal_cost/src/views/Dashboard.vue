<template>
  <v-row>
    <v-col>
      <div class="text-h4 text-md-h3 mb-8">My personal cost</div>
      <v-dialog v-model="modalShown" width="500">
      <template v-slot:activator="{on}">
        <v-btn color="teal lighten-2" dark v-on="on" >
          ADD NEW COST <v-icon>mdi-plus</v-icon>
          </v-btn>
      </template>
      <v-card>
        <AddPayment @addNewPayment="addData" 
        @close="onClose"
        v-if="modalSettings"
        :settings="modalSettings"
        :undateSettings="undateSettings"
        />
      </v-card>
      <v-btn @click="modalShown=false" plain>Close</v-btn>
    </v-dialog>
      <PaymentsDisplay :list="currentElements" />
      <template>
        <div class="text-center" plain>
          <v-pagination 
            v-model="curPage"
            :length="paymentsList.length"
          ></v-pagination>
        </div>
      </template>
    </v-col>
    <v-col>
      chart
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPayment from "../components/AddPayment.vue";
  export default {
      name: "Dashboard",
      components: {
      PaymentsDisplay,
      AddPayment
    },
      data() {
    return {
      page: "",
      settings: {
        header: "AddPayment",
        content: "addPaymentForm",
      },
      curPage: 1,
      n: 5,
      modalShown: false,
      modalSettings: {},
      undateSettings: {},
    };
  },
    methods: {
    ...mapMutations([
      "setPaymentsListData",
      "addDataToPaymentsList",
      "deletPaymentListData",
    ]),
    ...mapMutations([
      "setPaymentsListData",
      "addDataToPaymentsList",
      "deletPaymentListData",
    ]),
    ...mapActions(["fetchData", "fetchCategory"]),
    addData(data) {
      this.addDataToPaymentsList(data);
    },
    goToThePageNoFound() {
      this.$router.push({ name: "NotFound" });
    },
    onClose() {
      this.addFormShown = false;
    },
    onChangePage(p) {
      this.curPage = p;
    },
    showPaymenysForm() {
      this.$modal.show("AddPayment", { header: "Add" });
    },
    closePaymenysForm() {
      this.$modal.hide();
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
/*         onContextMenuClick(item, id) {
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
    }, */
  },
    computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
    }),
    currentElements() {
      const { n, curPage } = this;
      return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n);
    },

  },
    created() {
    this.fetchData();
    if (!this.categories.length) {
      this.fetchCategory();
    }
  },
    mounted() {
    this.$modal.show();
    this.$modal.hide();
    this.$modale.showMenu();
    this.$modale.closeMenu();
     const page = this.$route.params.page || 1;
    this.curPage = Number(page);
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
    this.$modale.EventBus.$on("showMenu", this.onItemsShow);
    this.$modale.EventBus.$on("closeMenu", this.onItemsHide);
    },
    beforeDestroy(){
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
    this.$modale.EventBus.$off("showMenu", this.onItemsShow);
    this.$modale.EventBus.$off("closeMenu", this.onItemsHide);
    }
  }
</script>