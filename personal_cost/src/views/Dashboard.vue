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
          <AddPayment @addNewPayment="addData" v-if="modalShown" />
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
      <Chartjs />
    </v-rol>
  </v-row>
</template>

<script>
/* import { Pie } from "vue-chartjs"; */
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPayment from "../components/AddPayment.vue";
import Chartjs from "../components/Chartjs.vue"
export default {
  //extends: Pie,
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
/*      setUp() {
      this.renderChart({
        labels: [
          "Food",
          "Sport",
          "Education",
          "Entertaiment",
          "Navigation",
          "Family",
        ],
        datasets: [
          {
            label: "Chart",
            data: [738, 900, 3000, 1938, 100, 1468],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },  */
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
    //this.setUp()
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