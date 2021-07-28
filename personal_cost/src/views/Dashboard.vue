<template>
  <div>Dashboard
          Totatl: {{ getFPV }}
      <PaymentsDisplay :list="currentElements" />
      <Pagination
        :cur="curPage"
        :n="n"
        :length="paymentsList.length"
        @paginate="onChangePage"
      />
            <button @click="showPaymenysForm">Show Paymenys Form</button>
      <button @click="closePaymenysForm">Close Paymenys Form</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import Pagination from "../components/Pagination.vue";
  export default {
      name: "Dashboard",
      components: {
      PaymentsDisplay,
      Pagination,
    },
      data() {
    return {
      page: "",
      settings: {
        header: "AddPayment",
        content: "addPaymentForm",
      },
      curPage: 1,
      n: 3,
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
    getFPV() {
      return this.$store.getters.getFuulPaymentValue;
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