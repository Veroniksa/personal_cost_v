<template>
    <div :class="[$style.addPaym]">
        <div :class="[$style.btnToggle]">
            <button @click="toggle">ADD NEW COST +</button>
        </div>
        <div v-show="show" :class="[$style.addDate]">
          <input v-model="date" placeholder="date"/>
          <div :class="[$style.addDate]">
            <select v-model="selected">
              <option v-for="(option, idx) in getCategoryList" 
              :key="idx" :value="option">
                {{option}}
              </option>
            </select>
          </div>
          <input v-model.number="value" type="number" placeholder="value"/>
          <button @click="onClick">
            ADD +
          </button>
          <button @click="cancell">
            Cancell
          </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters  } from 'vuex'
export default {
  name: "AddPayment",
  data() {
      return {
          date: '',
          category: '',
          value: null,
          show: false,
          selected: ''
      }
  },
methods: {
  goToPageDashboard(){
    this.$router.push({
       name: 'dashboard'
    })
  },
    cancell(){
        this.date = '',
        this.category = '',
        this.value = null
    },
    toggle () {
        this.show = !this.show
    },
        onClick(){
            const { value } = this
            const data = {
                date: this.date || this.getCurrentDate,
                category: this.selected,
                value
            }
            // console.log('add', data)
            if(this.getValueQueryFromRoute && this.getCategoryParamsFromRoute){
              this.$store.commit('addDataToPaymentsList', data)
              this.goToPageDashboard
              return
            }

            //Вызов события, название события и аргументы
            this.$emit('addNewPayment', data)
        },
        ...mapActions([
     'loadCategories'
   ]),
      mounted () {
   if (!this.getCategoryList.length) {
     this.loadCategories()
   }
 }
     },
    computed: {
        getCurrentDate() {
            const today = new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        },
        ...mapGetters([
     'getCategoryList'
   ]),
   getValueQueryFromRoute(){
     return Number(this.$route.query?.value) ?? null
   },
    getCategoryParamsFromRoute(){
     return this.$route.params?.selected ?? null
   },
    },
  created(){
     if(!this.getValueQueryFromRoute || !this.getCategoryParamsFromRoute){
       this.goToPageDashboard
     }
     this.selected = this.getCategoryParamsFromRoute
     this.value = this.getValueQueryFromRoute
   }
}
</script>

<style lang="scss" module>
.addPaym{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    .btnToggle{
      button{
        padding: 10px;
        margin: 20px;
      }
    }
}
.addDate{
    display: flex;
    flex-direction: column;

    select{
      margin-bottom: 10px;
    }
    input:not(:last-child){
      margin-bottom: 10px;
    } 
    button:not(:last-child){
      margin-bottom: 10px;
    }
}
</style>
