/*The fetcher function is a simple utility designed to make HTTP GET requests 
using Axios and abstracts the process of sending a request to a specified URL 
and handling the response. It is used by useSWR hook */

import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((response) => response.data)

export default fetcher