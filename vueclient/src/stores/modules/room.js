export default   {
    namespaced : true ,
    state  : {
        data : null,
        rooms : []
    },
    mutation : {
        setRoom : async function (state , rooms) {
            state,rooms = rooms
        }
    },
    actions : {
        async getRoom(contexxt) {
            let data = await axios.get('room')
            .then ((response) => {
                return response.data
            }).catch((error) => {
                console.log(error)
                return null 
            })
            return data
        }
    }
}