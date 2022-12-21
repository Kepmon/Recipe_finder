import './sass/style.scss'

const optionHeaders = Array.from(document.querySelectorAll('.pointer'))
const addMoreBtn = document.querySelector('.add-more')
const form = document.querySelector('.main__form')
const optionBtns = document.querySelectorAll('.main__form-option-btn')
const downArrows = Array.from(document.querySelectorAll('.down-arrow'))
const findButton = document.querySelector('.main__form-find')

let selectedOptions = {}
let selectedButtons = []
let ingredientArray = []
let dietArray = []
let dishArray = []
let cuisineArray = []
let healthArray = []
let linkOptions = []

const showBtns = e => {
    const btnsBoxes = document.querySelectorAll('.main__form-option-btns')
    let clickedIndex = optionHeaders.indexOf(e.target)

    if (e.target.classList.contains('fa-solid')) {
        clickedIndex = downArrows.indexOf(e.target)
    }
    
    btnsBoxes[clickedIndex].classList.toggle('btns-active')
    downArrows[clickedIndex].classList.toggle('arrow-upwards')
}

const preventDefault = e => e.preventDefault()

const addMoreInputs = () => {
    const moreInputsTemplate = document.querySelector('.main__form-option-box')
    const newInputs = document.querySelector('.main__form-option-inputs')
    const nextInput = moreInputsTemplate.content.cloneNode(true)
    
    newInputs.appendChild(nextInput)
}

const readSelectedInputs = e => {
    const option = e.target
    const optionKey = option.name
    const optionValue = option.value
    
    selectedOptions[optionKey] = optionValue

    if (optionKey === 'ingredient') {
        ingredientArray.push(optionValue)

        selectedOptions[optionKey] = ingredientArray
    }
}

const collectSelectedButtons = () => {
    selectedButtons = []
    dietArray = []
    dishArray = []
    cuisineArray = []
    healthArray = []
    
    optionBtns.forEach(btn => {
        if (btn.classList.contains('btn-chosen') && selectedButtons.includes(btn) === false)
        {
            selectedButtons.push(btn)
        }
    })
    
    selectedButtons.forEach(button => {
        switch(button.name) {
            case 'diet':
                dietArray.push(button.value.charAt(0).toLowerCase() + button.value.slice(1))
                break
            case 'dishType':
                dishArray.push(button.value.charAt(0).toLowerCase() + button.value.slice(1))
                break
            case 'cuisineType':
                cuisineArray.push(button.value.charAt(0).toLowerCase() + button.value.slice(1))
                break
            case 'health':
                if (button.value !== 'DASH' || button.value !== 'FODMAP-free') {
                    healthArray.push(button.value.charAt(0).toLowerCase() + button.value.slice(1))
                }
                else {
                    healthArray.push(button.value)
                }
                break
        }
    })
        
    selectedOptions['diet'] = dietArray
    selectedOptions['dishType'] = dishArray
    selectedOptions['cuisineType'] = cuisineArray
    selectedOptions['health'] = healthArray
}

const makeQueries = () => {
    if(selectedOptions.q !== undefined) {
        const nameQuery = `&q=${selectedOptions.q}`
        linkOptions.push(nameQuery)
    }
    
    if (selectedOptions.caloriesFrom !== undefined && selectedOptions.caloriesTo !== undefined) {
        const caloriesQuery = `&calories=${selectedOptions.caloriesFrom}-${selectedOptions.caloriesTo}`
        linkOptions.push(caloriesQuery)
    }
    
    for (let option in selectedOptions) {
        if (selectedOptions[option].length !== 0 && typeof(selectedOptions[option]) === 'object')
        {
            const arrayQuery = selectedOptions[option].map(item => `&${option}=${item}`)
            linkOptions.push(...arrayQuery)
        }
    }
}


const makeApiCall = () => {
    const env = import.meta.env
    const URL = 'https://api.edamam.com/api/recipes/v2'
    const core = `${URL}?app_id=${env.VITE_API_ID}&app_key=${env.VITE_API_KEY}&type=public`

    const linkQuery = linkOptions.reduce((previousOption, currentOption) => previousOption + currentOption, core)

    fetch(linkQuery)
    .then(res => res.json())
    .then(data => {
        const contribution = document.querySelector('.main__contribution')
        const dataResults = data.hits

        contribution.style.backgroundColor = 'var(--background-brown)';
        dataResults.forEach(result => {
            const cardsContainer = document.querySelector('.main__result-cards')
            const resultTemplate = document.querySelector('.main__result-box')
            const resulstWindow = document.querySelector('.main__results')
            const resultCard = resultTemplate.content.cloneNode(true)

            resulstWindow.style.display = 'block'
            resultCard.querySelector('.main__result-card-title').textContent = result.recipe.label
            resultCard.querySelector('.main__result-card-img').setAttribute('src', result.recipe.image)
            resultCard.querySelector('.calories-number').textContent = parseInt(result.recipe.calories)
            result.recipe.ingredientLines.forEach(line => {
                const ingredientLine = document.createElement('li')
                ingredientLine.classList.add('ingredient-item')
                ingredientLine.textContent = line
                resultCard.querySelector('.main__result-card-ingredients').appendChild(ingredientLine)
            })
            cardsContainer.appendChild(resultCard)
        })
    })
}



const displayYear = () => {
    const year = document.querySelector('.footer__year')
    const currentYear = new Date().getFullYear()
    
    year.textContent = currentYear
}

form.addEventListener('click', preventDefault)
form.addEventListener('keyup', preventDefault)
form.addEventListener('change', readSelectedInputs)
optionBtns.forEach(btn => btn.addEventListener('change', readSelectedInputs))
optionBtns.forEach(btn => btn.addEventListener('click', () => btn.classList.toggle('btn-chosen')))
optionHeaders.forEach(header => header.addEventListener('click', showBtns, {capture: true}))
addMoreBtn.addEventListener('click', addMoreInputs)
findButton.addEventListener('click', collectSelectedButtons)
findButton.addEventListener('click', makeQueries)
findButton.addEventListener('click', makeApiCall)
window.addEventListener('DOMContentLoaded', displayYear)
