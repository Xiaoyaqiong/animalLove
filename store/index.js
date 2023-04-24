import Vue from 'vue'
import Vuex from 'vuex' 
import user from './user.js'

Vue.use(Vuex)

 const store = new Vuex.Store(
{
	state:{},
	mutations:{},
	getters:{},
	actions:{},
	modules:{
		user,

	}
}
)

export default store