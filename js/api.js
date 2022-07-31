// Dictionary API
define(["jquery", "env"], function($, env) {
    
  const api = {}

  api.getDictApiData = function (word, callback) {
    return fetch(env.DICT_API_URL + word)
      .then((response) => {
        return response.json()
      .then((json) => {
        let data = json[0].meanings[0].definitions[0].definition
        return data
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }

  return api
})