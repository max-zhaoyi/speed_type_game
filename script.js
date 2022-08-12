const RANDOM_QUOTES_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')
const quoteInputElement = document.getElementById('quote-input')
const timerElement = document.getElementById('type-timer')
let startTime

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan,index)=>{
        const character = arrayValue[index]
        if (character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) renderNextQuote()
})

function generateQuote(){
    return fetch(RANDOM_QUOTES_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}


function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval (()=> {
        timerElement.innerText = refreshTime()
    }, 1000)
}

function refreshTime() {
    return Math.floor((new Date() - startTime)/1000)
}

async function renderNextQuote(){
    const quote = await generateQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

renderNextQuote()