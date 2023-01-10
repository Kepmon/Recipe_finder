export const resultWindow = document.querySelector('.main__results')
export let detailLinks

import { createList } from "./lists"

export const renderCardsSection = data => {
    const contribution = document.querySelector('.main__contribution')
    const dataResults = data.hits
    const cardsContainer = document.querySelector('.main__result-cards')
    
    contribution.style.backgroundColor = 'var(--background-brown)'
    resultWindow.style.display = 'block'

    dataResults.forEach(result => {
        const resultTemplate = document.querySelector('.main__result-box')
        const resultCard = resultTemplate.content.cloneNode(true)

        resultCard.querySelector('.main__result-card-title').textContent = result.recipe.label
        resultCard.querySelector('.main__result-card-img').setAttribute('src', result.recipe.image)
        resultCard.querySelector('.calories-number').textContent = parseInt(result.recipe.calories / result.recipe.totalWeight * 100)
        const createdList = createList('Ingredients', 'main__result-card-ingredients', result.recipe.ingredientLines)
        resultCard.querySelector('.main__result-card-ul').append(createdList)
        cardsContainer.append(resultCard)
    })
    
    contribution.scrollIntoView()
    detailLinks = Array.from(cardsContainer.querySelectorAll('.read-more-link'))
}

export const showMealDetails = async (e, data) => {
    const dataResult = data.hits
    const detailWindow = document.querySelector('.main__details')
    const detailsTemplate = document.querySelector('.details-template')
    const detailsBox = detailsTemplate.content.cloneNode(true)
    const clickedMeal = dataResult[detailLinks.indexOf(e.target)]

    detailWindow.style.display = 'block'

    detailsBox.querySelector('.main__details-header').textContent = clickedMeal.recipe.label
    detailsBox.querySelector('.clicked-food').setAttribute('src', clickedMeal.recipe.image)
    detailsBox.querySelector('.cuisine-type').textContent = clickedMeal.recipe.cuisineType
    
    const dietUl = createList('', 'diet-labels', clickedMeal.recipe.dietLabels)
    detailsBox.querySelector('.main__details-diet').append(dietUl)
    const healthUl = createList('', 'health-labels', clickedMeal.recipe.healthLabels)
    detailsBox.querySelector('.main__details-health').append(healthUl)
    const ingredientsUl = createList('', 'ingredients', clickedMeal.recipe.ingredientLines)
    detailsBox.querySelector('.main__details-ingredients').append(ingredientsUl)
    
    detailsBox.querySelector('.serving-size').textContent = parseInt(clickedMeal.recipe.totalWeight)
    detailsBox.querySelector('.calories-per-serving').textContent = parseInt(clickedMeal.recipe.calories)
    detailsBox.querySelector('.calories-fat').textContent = parseInt(clickedMeal.recipe.totalNutrients.FAT.quantity * 9)
    detailsBox.querySelector('.total-fat').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.FAT.quantity)} ${clickedMeal.recipe.totalNutrients.FAT.unit}`
    detailsBox.querySelector('.saturated-fat').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.FASAT.quantity)} ${clickedMeal.recipe.totalNutrients.FASAT.unit}`
    detailsBox.querySelector('.trans-fat').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.FATRN.quantity)} ${clickedMeal.recipe.totalNutrients.FATRN.unit}`
    detailsBox.querySelector('.cholesterol').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.CHOLE.quantity)} ${clickedMeal.recipe.totalNutrients.CHOLE.unit}`
    detailsBox.querySelector('.total-carbohydrate').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.CHOCDF.quantity)} ${clickedMeal.recipe.totalNutrients.CHOCDF.unit}`
    detailsBox.querySelector('.dietary-fiber').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.FIBTG.quantity)} ${clickedMeal.recipe.totalNutrients.FIBTG.unit}`
    detailsBox.querySelector('.sugars').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.SUGAR.quantity)} ${clickedMeal.recipe.totalNutrients.SUGAR.unit}`
    detailsBox.querySelector('.sugar-alcohol').textContent = `${parseInt(clickedMeal.recipe.totalNutrients['Sugar.alcohol'].quantity)} ${clickedMeal.recipe.totalNutrients['Sugar.alcohol'].unit}`
    detailsBox.querySelector('.protein').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.PROCNT.quantity)} ${clickedMeal.recipe.totalNutrients.PROCNT.unit}`
    detailsBox.querySelector('.sodium').textContent = `${parseInt(clickedMeal.recipe.totalNutrients.NA.quantity)} ${clickedMeal.recipe.totalNutrients.NA.unit}`
    detailsBox.querySelector('.see-recipe').setAttribute('href', clickedMeal.recipe.url)
    detailWindow.append(detailsBox)
    detailWindow.scrollIntoView()
}