export default defineEventHandler(async (event) => {
    // List all keys with
    const storage = useStorage('redis')

    let foo = await storage.getItem('foo')

    if (foo) {
        console.log('foo:', foo)
    }
    else {
        // Set a key with
        foo = new Date().toISOString()
        await storage.setItem('foo', foo)
    }

    return {
        hello: `world from ${process.env.NUXT_SERVER_ID} (${foo})`
    }
})
