<template>
  <div :class="[$style.addPaym]">
    <!-- @addValues="addValues" -->
    <!-- <div :class="[$style.btnToggle]">
      <button @click="toggle">ADD NEW COST +</button>
    </div> -->
    <div :class="[$style.addDate]">
      <input v-model="date" placeholder="date" class="date" />
      <div :class="[$style.addDate]">
        <select v-model="selected" class="selected">
          <option
            v-for="(option, idx) in getCategoryList"
            :key="idx"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <input v-model.number="value" type="number" placeholder="value" class="value"/>
      <button @click="onClick">Save +</button>
      <button @click="cancell">Cancell</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "AddPayment",
  props: ["undateSettings"],
  data() {
    return {
      date: "",
      category: this.finalCategory,
      value: Number(this.finalValue),
      // show: false,
      selected: "",
    };
  },
  methods: {
    ...mapMutations(["updatePaymentList"]),
    /*   addValues(item){
    this.updatePaymentList(item.id)
    console.log(item)
      this.data = this.item.data
      this.category = this.item.category
      this.value = this.item.value
  }, */
    goToPageDashboard() {
      this.$router.push({
        name: "dashboard",
      });
    },
    cancell() {
      (this.date = ""), (this.category = ""), (this.value = null);
    },

    onClick() {
      const { value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.selected,
        value,
      };
      // console.log('add', data)

      this.$store.commit("addDataToPaymentsList", data);
      this.goToPageDashboard;

      //Вызов события, название события и аргументы
      this.$emit("addNewPayment", data);
    },
    ...mapActions(["loadCategories"]),
    mounted() {
      this.category = this.finalCategory;
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
      } else if (this.undateSettings.name) {
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
  created() {
    /*     if(this.values){
      this.data = this.values.date
    } */
    /*       this.data = this.editedValue.data
      this.category = this.editedValue.category
      this.value = this.editedValue.value */
    if (!this.getValueQueryFromRoute || !this.getCategoryParamsFromRoute) {
      this.goToPageDashboard;
    }
    this.selected = this.getCategoryParamsFromRoute;
    this.value = this.getValueQueryFromRoute;
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
