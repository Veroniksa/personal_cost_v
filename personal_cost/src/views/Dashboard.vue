<template>
  <v-row>
    <v-rol>
      <div class="text-h4 text-md-h3 mb-8">My personal cost</div>
      <v-dialog v-model="modalShown" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="teal lighten-2" dark v-on="on">
            ADD NEW COST <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
         <v-card>
          <AddPayment @addNewPayment="addData" v-if="modalShown && !undateSettings.name" 
          :setting="modalSettings" />
        </v-card> 
        <v-card>
          <AddPayment @addNewPayment="addData"
          v-if="undateSettings.name && modalShown"
          :setting="undateSettings"
          :undateSettings="undateSettings" 
          @activator = "modalShown = true" />
        </v-card>
        <v-btn @click="modalShown = false" plain>Close</v-btn>
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
    </v-rol>
    <v-rol>
      chart
      <canvas ref="canvas"></canvas>
      <Chartjs />
    </v-rol>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPayment from "../components/AddPayment.vue";
import Chartjs from "../components/Chartjs.vue"
export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPayment,
    Chartjs
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
    ...mapActions(["fetchData", "fetchCategory"]),
    addData(data) {
      this.addDataToPaymentsList(data);
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