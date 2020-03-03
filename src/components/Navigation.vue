<template>

<div class="header clearfix">
    <b-navbar toggleable="md" >
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <!-- Put the toggle here after the brand -->
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <router-link class="nav-link" tag="a" :to="{ name: 'home' }">Home</router-link>
                <router-link v-if="!authenticated" class="nav-link" tag="a" :to="{ name: 'signin' }">Sign In</router-link>
                <router-link v-if="!authenticated" class="nav-link" tag="a" :to="{ name: 'register' }" >Register</router-link>
                <router-link v-if="authenticated" class="nav-link" tag="a" :to="{ name: 'dashboard' }">Dashboard</router-link>
                <router-link v-if="authenticated" class="nav-link" tag="a" to="/products/create" >Create</router-link>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <a href="#" class="nav-link" v-if="authenticated" @click.prevent="signout" >Sign out</a>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>


</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },

        methods: {
            ...mapActions({
                signoutaction: 'auth/signout'
            }),

            signout () {
                this.signoutaction().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            }
        }
    }
</script>

<style>
</style>
