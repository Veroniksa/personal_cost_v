<template>
<v-container>
      <v-text-field v-model="date" label="Date" placeholder="Date" />
      <v-select v-model="selected" label="Category" :items="categoryList" placeholder="Category">
      </v-select>
      <v-text-field v-model.number="value" type="number" label="Value" placeholder="Value"/>
      <v-card-text>
        <v-row
        align="center"
        justify="center"
      >
      <v-btn-toggle>
        <v-btn @click="onClick" plain>Add <v-icon>mdi-plus</v-icon></v-btn>
        <v-btn @click="cancell" plain>Cancell</v-btn>
        <v-btn @click="changePayment" plain>Save <v-icon>mdi-plus</v-icon></v-btn>
      </v-btn-toggle>
        </v-row>
      </v-card-text>
      
      
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "AddPayment",
  props: ["undateSettings"],
  data() {
    return {
      date: "",
      selected: this.finalCategory,
      value: Number(this.finalValue),
      // show: false,
    };
  },
  methods: {
    ...mapMutations(["updatePaymentList"]),
    goToPageDashboard() {
      this.$router.push({
        name: "dashboard",
      });
    },
    cancell() {
      (this.date = ""), (this.category = ""), (this.value = null);
    },
    changePayment() {
      const { selected, value } = this;
      const date = this.date;
      
      const id = this.undateSettings.item.id;
      const data = {
        idx: this.undateSettings.id,
        item: {id, date, selected, value},
      };
      console.log(data)
      this.$store.commit("changePayment", data);
      this.$modal.hide();
      this.$modale.closeMenu();
    },
    onClick() {
      const { value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        selected: this.selected,
        value,
      };

      this.$store.commit("addDataToPaymentsList", data);
      this.goToPageDashboard;

      //Вызов события, название события и аргументы
      this.$emit("addNewPayment", data);
    },
    ...mapActions(["loadCategories"]),
    mounted() {
      this.selected = this.finalCategory;
      this.value = this.finalValue;
      if (!this.getCategoryList.length) {
        this.loadCategories();
        if (this.item) {
          this.addValues;
        }
      }
    },
  },
  computed: {
    categoryList(){
      return this.$store.getters.getCategoryList
    },
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    ...mapGetters(["getCategoryList"]),
    getValueQueryFromRoute() {
      return Number(this.$route.query?.value) ?? null;
    },
    getCategoryParamsFromRoute() {
      return this.$route.params?.selected ?? null;
    },
    finalValue() {
      if (this.getValueQueryFromRoute) {
        return this.getValueQueryFromRoute;
      } else if (this.undateSettings) {
        return this.undateSettings.item.value;
      } else return "";
    },
    finalCategory() {
      if (this.getCategoryParamFromRoute) {
        return this.getCategoryParamFromRoute;
      } else if (this.undateSettings.name) {
        return this.undateSettings.item.category;
      } else return "Food";
    },
  },
  mounted() {
    this.selected = this.finalCategory;
    this.value = this.finalValue;
  },
};
</script>

<style lang="scss" module>
.addPaym {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  .btnToggle {
    button {
      padding: 10px;
      margin: 20px;
    }
  }
}
.addDate {
  display: flex;
  flex-direction: column;

  select {
    margin-bottom: 10px;
  }
  input:not(:last-child) {
    margin-bottom: 10px;
  }
  button:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>