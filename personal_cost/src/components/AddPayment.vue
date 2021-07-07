<template>
    <div :class="[$style.addPaym]">
        <div :class="[$style.btnToggle]">
            <button @click="toggle">ADD NEW COST +</button>
        </div>
        <div v-show="show" :class="[$style.addDate]">
          <input v-model="date" placeholder="date"/>
          <input v-model="category" placeholder="category"/>
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
export default {
  name: "AddPayment",
  data() {
      return {
          date: '',
          category: '',
          value: null,
          show: false
      }
  },
methods: {
    cancell(){
        this.date = '',
        this.category = '',
        this.value = null
    },
    toggle () {
        this.show = !this.show
    },
        onClick(){
            const { category, value } = this
            const data = {
                date: this.date || this.getCurrentDate,
                category,
                value
            }
            console.log('add', data)
            //Вызов события, название события и аргументы
            this.$emit('addNewPayment', data)
        }
    },
    computed: {
        getCurrentDate() {
            const today = new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        }
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
        background: darkturquoise;
        color: white;
        padding: 10px;
        margin: 20px;
        border: none;
      }
    }
}
.addDate{
    display: flex;
    flex-direction: column;

    input:not(:last-child){
      margin-bottom: 10px;
    } 
    button:not(:last-child){
      margin-bottom: 10px;
      background: darkturquoise;
      border: none;
      color: white;
    }
}
</style>
