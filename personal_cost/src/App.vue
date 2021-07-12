<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <AddPayment @addNewPayment="addData" />
      <br/>
      Totatl: {{ getFPV }}
      <PaymentsDisplay :list="paymentsList"/>
      
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPayment from './components/AddPayment.vue'
/*import CategorySelect from "./components/CategorySelect.vue"
<CategorySelect :categories="categories" />*/

import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    //CategorySelect,
    AddPayment
  },
  methods: {
    ...mapMutations([
      'setPaymentsListData',
      'addDataToPaymentsList'
    ]),
    ...mapActions([
      'fetchData',
      'fetchCategory'
    ]),
    addData(data){
      //console.log(data)
      // this.paymentsList.push(data)
      //this.paymentsList = [...this.paymentsList, data]
      this.addDataToPaymentsList(data)
    },
/*     fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169
        },
        {
          date: "20.04.2021",
          category: "Sport",
          value: 400
        },
        {
          date: "28.05.2020",
          category: "Internet",
          value: 200
        },
      ]
    } */
  },
  computed: {
    ...mapGetters({
      paymentsList: 'getPaymentList',
      categories: 'getCategoryList'
    }),
    getFPV(){
      return this.$store.getters.getFuulPaymentValue
    },
/*     paymentsList(){
      return this.$store.getters.getPaymentList
    } */
  },
  created() {
    //this.$store.commit('setPaymentsListData', this.fetchData()) //mutations
    //this.setPaymentsListData(this.fetchData())
    //this.$store.dispatch('fetchData') //actions(нативная запись)
    this.fetchData()
    if(!this.categories.length) {
      this.fetchCategory()
    }
    //this.paymentsList = this.fetchData(),
  }
}
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 20px;
  background: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;

  header{
    background: linear-gradient(
   45deg, white, transparent);
  }
  button{
    border-radius: 5px;
    background: darkturquoise;
    color: white;
    border: none;
  }
}
</style>
