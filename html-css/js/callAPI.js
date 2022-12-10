try {
    fetch('https://cukcuk.manhnv.net/api/v1/Employees')
    .then((response) =>{
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
} catch (error) {
    debugger
}