<template>
    <form @submit.prevent="submit">
        <div>
            <label for="name">
                Name
            </label>
            <input type="text" v-model="form.name" placeholder="Name" id="name" required>
        </div>

        <div>
            <label for="password">
                Password
            </label>
            <input type="password" name="password" id="password" placeholder="Password" v-model="form.password" required>
        </div>

        <div>
            <label for="password_confirmation">
                Password Confirmation
            </label>
            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" v-model="form.password_confirmation" required>
        </div>

        <div>
            <label for="email">
                Email
            </label>
            <input type="text" v-model="form.email" placeholder="Email" id="email" required>
        </div>

        <div>
            <button class="submit">
                Sign in
            </button>
        </div>

        <!--<div v-if="register_ok">-->
            <!--<p>cadastro concluido com sucesso. Voce sera redirecionado para login</p>-->
        <!--</div>-->

        <!--<div v-if="register_error">-->
            <!--<p>Houve um erro ao se cadastrar valide sua informacoes</p>-->
            <!--<ul>-->
            <!--<li v-for="(item, index) in register_error" :key="index">-->
                <!--{{ item[0] }}-->
            <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
    </form>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'register',
        components: {
            //
        },

        data() {
            return {
                form: {
                    name:'',
                    password:'',
                    password_confirmation:'',
                    email:'',
              }
            }

        },
        computed: {
            ...mapGetters({
                register_ok: 'auth/register_ok',
                register_error: 'auth/register_error'
            })
        },


        methods: {
            ...mapActions({
               register: 'auth/register'
            }),
            submit () {
                this.register(this.form).then(() => {
                    if(this.register_ok){
                        setTimeout(()=>{
                            this.redirect()
                        },2000);

                    }
                }).catch((error) => {
                    console.log(error)
                })

            },
            redirect () {
                this.$router.replace({
                    name: 'signin'
                })
            }
        }
    }
</script>
