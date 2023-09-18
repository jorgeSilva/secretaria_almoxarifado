import axios from "axios";

const api = axios.create({
  baseURL: 'https://backendsecretariaalmoxarifado-production.up.railway.app/'
})

export default api