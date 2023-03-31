import axios from 'axios'

const client = axios.create({baseURL: 'https://sesadigital.com/api'})

export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = 'Bearer token'
}