export const baseURL = 'https://market-daa4b-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const API = {
    get: (cat , clothes ,id) => {
        return fetch(`${baseURL}/${cat}/${clothes}${id}` , {
            method: 'GET'
        })
    },
    post: (data , cat , clothes , userId) => {
        return fetch(`${baseURL}/${cat}/${clothes}${userId}` , {
            method: 'POST',
            body: data
        })
    },
    patch: (data , cat , clothes , id) => {
        return fetch(`${baseURL}/${cat}/${clothes}/${id}` , {
            method: 'PATCH',
            body: data
        })
    },
    delete: (cat , clothes , id , el , card) => {
        return fetch(`${baseURL}/${cat}/${clothes}/${id}${el}${card}` , {
            method: 'DELETE'
        })
    }
}