import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 
'http://localhost:8080' : 'www.xxx.com'

export default axios