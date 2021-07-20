<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
    </header>
    <div class="menu">
      <router-link to="/dashboard">Dashboard</router-link> /
      <router-link to="/about">About</router-link> /
      <button @click="goToThePageNoFound">Not Found</button>
<!--       <router-link to="/NotFound">Not Found</router-link>
 --><!--       <a href="dashboard">Dashboard</a> /
      <a href="about">About</a> /
      <a href="notfound">Not Found</a> -->
    </div>
    <main>
      <div class="content-page">
        <router-view></router-view>
<!--         <About v-if="page === 'about'"/>
        <Dashboard v-if="page === 'dashboard'"/>
        <NotFound v-if="page === 'notfound'"/> -->
      </div>



      <AddPayment @addNewPayment="addData" />
      <br/>
      Totatl: {{ getFPV }}
      <PaymentsDisplay :list="currentElements"/>
      <Pagination 
                  :cur="curPage" 
                  :n="n" 
                  :length="paymentsList.length"
                  @paginate="onChangePage"/>
      <transition name="fade">
        <modal-window @close="onClose" v-if="modalSettings.name" :settings="modalSettings"/>
      </transition>
      <button @click="showPaymenysForm">Show Paymenys Form</button>
      <button @click="closePaymenysForm">Close Paymenys Form</button>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPayment from './components/AddPayment.vue'
import Pagination from './components/Pagination.vue'
/*import CategorySelect from "./components/CategorySelect.vue"
<CategorySelect :categories="categories" />*/

/* import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue' */

import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    Pagination,
/*     Dashboard,
    About,
    NotFound, */
    AddPayment,
    ModalWindow: ()=>import(/* webpackChunkName: 'ModalWindow'*/'./components/ModalWindow.vue')
  },
  data(){
    return {
      page: '',
      settings: {
        header: "AddPayment",
        content: "addPaymentForm"
      },
      curPage: 1,
      n: 3,
      modalShown: false,
      modalSettings: {}
    }
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
    goToThePageNoFound(){
      this.$router.push({name: "NotFound"})
    },
    onClose(){
      this.addFormShown = false
    },
/*     setPage(){
      this.page = location.pathname.slice(1)
    } */
    onChangePage(p){
      this.curPage = p
    },
    showPaymenysForm(){
      this.$modal.show('AddPayment', {header: "Add"})
    },
    closePaymenysForm(){
      this.$modal.hide()
    },
    onShown(settings) {
      this.modalSettings = settings
      console.log(settings)
    },
    onHide(){
      this.modalSettings = {}
    }
  },
  computed: {
    ...mapGetters({
      paymentsList: 'getPaymentList',
      categories: 'getCategoryList'
    }),
    currentElements(){
      const { n, curPage } = this
      return this.paymentsList.slice(n * (curPage - 1), n* (curPage - 1)+n)
    },
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
  },
  mounted(){  


/*       this.setPage()
      const links = document.querySelectorAll('a')
      links.forEach(link =>{
        link.addEventListener('click', event=>{
          event.preventDefault()
          history.pushState({}, "", link.href)
          this.setPage()
        })
      })
      window.addEventListener('popstate', this.setPage) */
    const page = this.$route.params.page || 1
    //console.log(page)
    this.curPage = Number(page)
    this.$modal.EventBus.$on('shown', this.onShown)
    this.$modal.EventBus.$on('hide', this.onHide)
  },
  beforeDestroy(){
    this.$modal.EventBus.$off('shown', this.onShown)
    this.$modal.EventBus.$off('hide', this.onHide)
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

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>