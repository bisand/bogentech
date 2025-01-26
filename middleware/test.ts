export default defineNuxtRouteMiddleware((to, from) => {
    const loggedIn = useNuxtApp().$auth.loggedIn
    console.log('loggedIn:', loggedIn)
})
