export default {
    namespaced: true,
    state: {
        data: null,
        chatrooms: []
    },
    mutation: {
        setChatroom: async function (state, rooms) {
            state.chatrooms = rooms
        }
    },
    actions: {
        async getChatRoom(context) {
            let data = await axios.get("chatroom")
                .then((response) => {
                    return response.data

                })
                .catch((error) => {
                    console.log(error)
                    return null
                })
            return data;

        },
        async createChatroom(context, form) {
            let data = await axios.post("chatroom", form)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    console.log(error)
                    return null
                })
            return data;
        }
    }
}