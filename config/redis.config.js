const { createClient } = require('redis');

const client = createClient()
const redis=async() => {
    try {
        await client.connect();
        console.log('redis server connected succesfully')
    } catch (error) {
        console.log('error occured in redis' , error.message)
    }

}
module.exports={
    client,
    redis
}
