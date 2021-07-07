<template>
    <div>
        <div>
            <button @click="toggle">ADD NEW COST +</button>
        </div>
        <div v-show="show">
        <input v-model="date" placeholder="date"/>
        <input v-model="category" placeholder="category"/>
        <input v-model.number="value" type="number" placeholder="value"/>
        <button @click="onClick">
            Add Data
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
