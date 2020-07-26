const weatherForm =document.querySelector('form')
const search= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
const messageThree= document.querySelector('#message-3')
//messageOne.textContent ='hi sonali'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
   const location =search.value
   messageOne.textContent='loading...'
   messageTwo.textContent=''
   messageThree.textContent=''

//-----------------------------------------------------------
fetch('http://localhost:3000/weather?address='+location+'').then((response)=>{
response.json().then((data)=>{
    if(data.error){
        messageOne.textContent=data.error
    }
    else{

        messageOne.textContent=data.place 
     
    messageTwo.textContent=data.forecast.temperature 
    messageThree.textContent=data.forecast.preciption
 }
})
})





}
)