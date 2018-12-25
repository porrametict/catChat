export default {
    namespaced: true,
    state: {
        data: null,
        user : null
    },
    mutation: {
        setUser: async function (state, user) {
            state.user = user
        }
    },
    actions: {
        getToken: async function (context, form) {
            let userform = {
                username: form.username,
                password: form.password
            }

            let token = await axios.post('login', userform)
                .then((response) => {
                    localStorage.access_token = response.data.token
                    axios.defaults.headers.common['Authorization'] = 'Beerer' + localStorage.access_token;
                    return response.data
                })
                .catch((error) => {
                    console.log(error)
                    return null
                });
            return token
        },
        getUser: async function (context, token) {
            let user = null;
            if (!token) {
                token = localStorage.access_token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            }

            if (token) {
                user = await axios.get('/getUser')
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        return null;
                    })
                localStorage.user = JSON.stringify(user)
                return user;
            }
            
            return null;
        },
        logout: async function (context) {
            localStorage.removeItem("user")
            localStorage.removeItem("access_token")
        }
    }
}