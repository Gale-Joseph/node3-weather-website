//console.log('Client side js is loaded')

//we are practiciing getting the json data from our site that we normally get with a search. We are testing boston.


//We are going to get information from form: 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{

    //form submissions refresh entire screen by default  ; to stop, use e.preventDefault
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            console.log(data.error)
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
        
        
    })
})
    console.log(location)
})