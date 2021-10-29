/**
 * fetch data from api wiht default options
 * @param {string} url - the url to fetch to
 * @param {object} options - additional options
 * @returns {Promise}
 */
export const fetchApi = async (url, options = {}) => {
          // const user = JSON.parse(localStorage.getItem('user'))
          const user = null
          if (user) options = { ...options, headers: { ...options.headers, authorization: `bearer ${user.token}` } }
          const response = await fetch(url, {
                    ...options
          })
          if (response.ok) {
                    return response.json()
          } else {
                    throw await response.json()
          }
}

export const randomInt = (min, max, exclude) => {
          let number = Math.round(Math.random() * (max - min) + min)
          while(number == exclude) {
                    number = Math.round(Math.random() * (max - min) + min)
          }
          return number
}