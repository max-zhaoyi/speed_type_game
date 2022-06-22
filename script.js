const RANDOM_QUOTES_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')
const quoteInputElement = document.getElementById('quote-input')

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan,index)=>{
        const character = arrayValue[index]
        if (character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
        } else if(character === characterSpan){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
        }
    })
})

function generateQuote(){
    return fetch(RANDOM_QUOTES_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNextQuote(){
    const quote = await generateQuote()
    quoteDisplayElement.innerText = quote
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.classList.add('correct')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}

renderNextQuote()