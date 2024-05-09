function api_getshaders(cb){
    fetch('http://localhost:8000/api/shaders', {
        method:'GET',
        cache:'no-cache',
    })
    .then(response=>response.json())
    .then(data=>cb(data))
    .catch(error=>console.log(error));
}


export {api_getshaders};