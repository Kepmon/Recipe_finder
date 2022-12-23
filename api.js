import { linkOptions } from "./script"

export const makeApiCall = () => {
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