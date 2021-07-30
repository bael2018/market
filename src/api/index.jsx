import { API } from './api'

export const createNewClothes = (data , cat , clothes , userId) => {
    return API.post(JSON.stringify(data) , cat , clothes , userId)
}

export const getClothes = (cat , clothes ,id) => {
    return API.get(cat , clothes ,id)
}

export const deleteClothe = (cat , clothes , id , el , card) => {
    return API.delete(cat, clothes , id , el , card)
}

export const changeClothes = (data , cat , clothes , id) => {
    return API.patch(JSON.stringify(data) , cat , clothes , id)
}