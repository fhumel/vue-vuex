import axios from 'axios';
import swal from 'sweetalert'

export default {
    namespaced: true,

    state: {
        token: null,
        user: null,
        register_ok: null,
        register_error: null
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        },

        register_ok (state) {
            return state.register_ok
        },

        register_error (state) {
            return state.register_error
        }
    },

    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_USER (state, data) {
            state.user = data
        },
        SET_REGISTER (state, data) {
            state.register_ok = data
        },
        SET_REGISTER_ERROR (state, data) {
            state.register_error = data
        }
    },

    actions: {
        async signin ({ dispatch },credencials) {
            credencials.grant_type= 'password';
            credencials.client_id= 2;
            credencials.client_secret= 'SLSrFO6CzZbc3wm25e1i6chw3fNFpIEuxGGOhZ2T';

            let response = await axios.post('oauth/token', credencials);

            return dispatch('attemp', response.data.access_token)
        },

        async attemp ({ commit, state}, token) {
            if (token) {
                commit('SET_TOKEN',token)
            }

            if (!state.token) {
                return;
            }

            try {
                let response = await axios.get('api/user');

                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },

        signout ({ commit}) {
            return axios.get('api/logout').then(() => {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            })
        },

        async register ({commit},credencials) {


            commit('SET_REGISTER', null);
            commit('SET_REGISTER_ERROR', null);

            return await axios.post('api/signup', credencials).then(function(){
                commit('SET_REGISTER', true);
                swal({
                    title: 'Cadastro feito com Sucesso!',
                    text: 'Faca seu login',
                    icon: "success",
                    button: 'Fechar'
                });

            }).catch(function(error){
                const errors                =   error.response.data.errors;
                const firstItem             =   Object.keys(errors)[0];
                const firstItemDOM          =   document.getElementById(firstItem);
                const firstErrorMessage     =   errors[firstItem][0];

                // scroll to the error messsage
                firstItemDOM.scrollIntoView({ behavior: 'smooth' });

                // remove all error messages
                const errorMessages         =   document.querySelectorAll('.text-danger');
                errorMessages.forEach((element) => element.textContent = '');

                // show error message
                firstItemDOM.insertAdjacentHTML('afterend', `<div class="text-danger">${firstErrorMessage}</div>`);

                // remove all from controls with highlited errors text bos
                const formControls          =   document.querySelectorAll('.form-control');
                formControls.forEach((element) => element.classList.remove('border', 'border-danger'));

                // highlight the form control with the error
                firstItemDOM.classList.add('border', 'border-danger');
                // console.log(error);
            });

        }
    }
}
