<template>
  <v-row>
    <v-rol>
      <div class="text-h4 text-md-h3 mb-8">My personal cost</div>
      <v-dialog v-model="modalShown" width="500">
      <template v-slot:activator="{on}">
        <v-btn color="teal lighten-2" dark v-on="on">
          ADD NEW COST <v-icon>mdi-plus</v-icon>
          </v-btn>
      </template>
      <v-card>
        <AddPayment @addNewPayment="addData" v-if="modalShown"/>
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
    </v-rol>
    <v-rol>
      chart
    </v-rol>
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
     const page = this.$route.params.page || 1;
    this.curPage = Number(page);
    }
  }
</script>