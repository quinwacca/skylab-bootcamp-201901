'use strict'

const userApi = {
    register(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/user', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                
                if (status === 'OK') return response.data.id
                else throw Error(response.error)
            })
    },

    login(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/auth', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                
                if (status === 'OK') {
                    return response.data }
                else throw Error(response.error)
            })

    },

    token: 'NO-TOKEN',

    retrieve(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('password is empty')

        return fetch (`https://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${this.token}`
            },
            // body: undefined
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') {
                    return response.data.username }
                else throw Error(response.error)
            })
    },

    update(id,data) {
        if (typeof data !== 'object') throw TypeError(`${data} is not an object`)
        if (!data.length()) throw Error('data is empty')

        return fetch (`https://skylabcoders.herokuapp.com/api/user/${id}`), {

        }

    }


}

export default userApi