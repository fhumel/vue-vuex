<template>
    <form @submit.prevent="submit">
        <div>
            <label for="username">
                Email
            </label>
            <input type="text" name="username" id="username" v-model="form.username">
        </div>

        <div>
            <label for="password">
                Password
            </label>
            <input type="password" name="passowrd" id="password" v-model="form.password">
        </div>

        <div>
            <button class="submit">
                Sign in
            </button>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex'
    import swal from 'sweetalert'

    export default {
        name: 'signin',
        components: {
            //
        },

        data() {
            return {
              form: {
                  username:'',
                  password:''
              }
            }

        },

        methods: {
            ...mapActions({
               signin: 'auth/signin'
            }),
            submit () {
                this.signin(this.form).then(() => {
                    this.$router.replace({
                        name: 'dashboard'
                    })
                }).catch(() => {
                    swal({
                        title: 'Email ou password incorreto!',
                        text: 'Tente novamente',
                        button: 'Fechar',
                        icon: "warning",
                    });
                })
            }
        }
    }
</script>
