import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: []
    },

    mutations: {
        changePayment(state, payload, ) {
            state.paymentsList.splice(payload.idx-1, 1, payload.item);
        }, 
        deletPaymentListData(state, payload){
            state.paymentsList.splice(payload, 1);
        },
        setPaymentListData(state, payload) {
            state.paymentsList = payload;
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload);
        },
        setCategoryList(state, payload) {
            state.categoryList = payload;
        }
    },

    actions: {
        fetchData({commit}){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve([
                        { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 },
                        { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 },
                        { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 },
                        { "id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969 },
                        { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 },
                        { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 },
                        { "id": 7, "date": "20.03.2020", "category": "Food", "value": 169 },
                        { "id": 8, "date": "21.03.2020", "category": "Navigation", "value": 50 },
                        { "id": 9, "date": "22.03.2020", "category": "Sport", "value": 450 },
                        { "id": 10, "date": "23.03.2020", "category": "Entertaiment", "value": 969 },
                        { "id": 11, "date": "24.03.2020", "category": "Education", "value": 1500 },
                        { "id": 12, "date": "25.03.2020", "category": "Food", "value": 200 },
                        
                    ]);
                },2000);
            }).then(res=>{
                commit('setPaymentListData', res);
            });
        },
        fetchCategory({commit}){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Family', 'Navigation', 'Entertaiment']);
                },1000);
            }).then(res=> {
                commit('setCategoryList', res);
            });
        }
    },

    getters: {
        getPaymentList: state => [...state.paymentsList, [1,2,3,]],

        getFuulPaymentValue: state =>{
            return state.paymentsList.reduce((res, cur)=> res + cur.value, 0);
        },
        getCategoryList: state=>state.categoryList,
    }
});