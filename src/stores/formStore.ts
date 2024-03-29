import type { Recipe, RecipesData } from '../types/recipes'
// eslint-disable-next-line import/no-unresolved
import { writable, get } from 'svelte/store'
import { nanoid } from 'nanoid'

export const formErrors = writable({
  noFieldFilled: '',
  negativeCalories: ''
})
export const recipesData = writable({
  hasNextPage: false,
  recipes: [] as Recipe[]
})

export const isFormSubmitted = writable(false)
export const recipesError = writable('')
export const idOfClickedRecipe = writable<null | string>(null)

const returnFormData = (currentID?: string) => ({
  q: '',
  calories: {
    from: '',
    to: ''
  },
  diet: {
    isExpanded: false,
    items: [
      'Balanced',
      'High-fiber',
      'High-protein',
      'Low-carb',
      'Low-fat',
      'Low-sodium'
    ]
  },
  dishType: {
    isExpanded: false,
    items: [
      'Alcohol cocktail',
      'Biscuits and cookies',
      'Bread',
      'Cereals',
      'Condiments and sauces',
      'Desserts',
      'Drinks',
      'Egg',
      'Ice cream and custard',
      'Main course',
      'Pancake',
      'Pasta',
      'Pastry',
      'Pies and tarts',
      'Pizza',
      'Preps',
      'Preserve',
      'Salad',
      'Sandwiches',
      'Seafood',
      'Side dish',
      'Soup',
      'Special occasions',
      'Starter',
      'Sweets'
    ]
  },
  cuisineType: {
    isExpanded: false,
    items: [
      'American',
      'Asian',
      'British',
      'Caribbean',
      'Central europe',
      'Chinese',
      'Eastern europe',
      'French',
      'Greek',
      'Indian',
      'Italian',
      'Japanese',
      'Korean',
      'Kosher',
      'Mediterranean',
      'Mexican',
      'Middle eastern',
      'Nordic',
      'South american',
      'South east asian',
      'World'
    ]
  },
  health: {
    isExpanded: false,
    items: [
      'Alcohol-free',
      'Dairy-free',
      'DASH',
      'Egg-free',
      'Fish-free',
      'FODMAP-free',
      'Gluten-free',
      'Keto-friendly',
      'Kidney-friendly',
      'Low-sugar',
      'Paleo',
      'Peanut-free',
      'Pescatarian',
      'Soy-free',
      'Vegan',
      'Vegetarian',
      'Wheat-free'
    ]
  },
  ingredients: [
    {
      name: '',
      id: currentID || nanoid()
    }
  ]
})
export const formData = writable(returnFormData())

export const focusErrorMessage = (errorMessage?: HTMLElement) => {
  const errorText =
    errorMessage == null
      ? (document.querySelector(
          '[data-message="form-error"]'
        ) as null | HTMLParagraphElement)
      : errorMessage
  const firstFormInput = document.querySelector(
    '[name="q"]'
  ) as null | HTMLInputElement

  if (errorText != null && firstFormInput != null) {
    errorText.focus()

    setTimeout(() => {
      firstFormInput.focus()
    }, 2500)
  }
}

const validateForm = (formDataObj: Record<string, string>) => {
  const formDataKeys = Object.keys(formDataObj)

  formErrors.set({
    noFieldFilled: '',
    negativeCalories: ''
  })

  if (
    formDataKeys.some(
      (key) =>
        key.includes('calories') &&
        formDataObj[key] !== '' &&
        !Number.isNaN(parseInt(formDataObj[key] as string, 10)) &&
        parseInt(formDataObj[key] as string, 10) < 0
    )
  ) {
    formErrors.set({
      noFieldFilled: '',
      negativeCalories: 'The caloric range values cannot be negative'
    })
  }

  if (formDataKeys.every((key) => formDataObj[key] === '')) {
    formErrors.set({
      noFieldFilled: 'At least one form section has to be filled in',
      negativeCalories: ''
    })
  }

  const formErrorsKeys = Object.keys(get(formErrors))
  const formErrorsData = get(formErrors)

  if (
    formErrorsKeys.some(
      (key) => formErrorsData[key as keyof typeof formErrorsData] !== ''
    )
  ) {
    focusErrorMessage()
    return false
  }

  return true
}

export const makeQueryLink = (
  formDataObj: Record<string, string>,
  base: string
) => {
  const formDataKeys = Object.keys(formDataObj)
  const writableFormData = get(formData)

  return formDataKeys.reduce((acc, key) => {
    const keyParts = key.split('-')
    const respectiveObj =
      writableFormData[keyParts[0] as keyof typeof writableFormData]

    if (
      formDataObj[key] !== '' &&
      (key === 'q' || key.includes('ingredient'))
    ) {
      return `${acc}&${keyParts[0]}=${formDataObj[key]}`
    }

    if (formDataObj[key] !== '' && !key.includes('calories')) {
      const respectiveValue =
        respectiveObj != null &&
        typeof respectiveObj !== 'string' &&
        'items' in respectiveObj
          ? respectiveObj.items.find(
              (_, index) => index === parseInt(keyParts[1], 10)
            )
          : ''

      if (
        respectiveObj != null &&
        typeof respectiveObj !== 'string' &&
        'items' in respectiveObj
      ) {
        return `${acc}&${keyParts[0]}=${respectiveValue
          ?.toLowerCase()
          .replaceAll(' ', '+')}`
      }
    }

    if (
      formDataObj[key] !== '' &&
      key.includes('calories') &&
      !acc.includes('calories')
    ) {
      const caloriesObj = writableFormData[keyParts[0] as 'calories']

      const respectiveFromValue = caloriesObj.from || 0
      const respectiveToValue = caloriesObj.to || 1000

      return `${acc}&${keyParts[0]}=${respectiveFromValue}-${respectiveToValue}`
    }

    return acc
  }, base)
}

export const scrollIntoSection = (section: HTMLElement) => {
  const contribution = document.querySelector(
    '[data-link="contribution"]'
  ) as null | HTMLAnchorElement
  const isContributionInThisSection =
    contribution?.closest('section') === section

  if (section != null && isContributionInThisSection) {
    contribution.focus()
    section.scrollIntoView()
    return
  }

  section.focus()
  section.scrollIntoView()
}

export const handleSubmit = async (e: Event) => {
  const section = document.querySelector(
    '[data-section="recipe-results"]'
  ) as null | HTMLDivElement
  const form = e.target as HTMLFormElement
  const formDataInstance = new FormData(form)
  const formDataObj = Object.fromEntries(formDataInstance) as Record<
    string,
    string
  >

  isFormSubmitted.set(true)

  const isFormValid = validateForm(formDataObj)

  if (!isFormValid) {
    isFormSubmitted.set(false)
    return
  }

  const url = new URL(window.location.origin)
  const formDataKeys = Object.keys(formDataObj)

  formDataKeys.forEach((key) => {
    if (formDataObj[key] !== '') {
      url.searchParams.set(key, formDataObj[key])
    }
  })

  window.history.pushState({}, '', url)

  const response = await fetch('/recipes.json', {
    method: 'POST',
    body: JSON.stringify({ formDataObj, moreRecipes: false }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    isFormSubmitted.set(false)
    recipesError.set(data.error)

    setTimeout(() => {
      recipesError.set('')
    }, 2500)
    return
  }

  recipesData.set(data)
  recipesError.set('')
  isFormSubmitted.set(false)

  if (section != null) {
    scrollIntoSection(section)
  }
}

export const loadMoreRecipes = async () => {
  const response = await fetch('/recipes.json', {
    method: 'POST',
    body: JSON.stringify({ moreRecipes: true }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = (await response.json()) as RecipesData

  recipesData.update((currentData) => ({
    hasNextPage: currentData.hasNextPage,
    recipes: [...currentData.recipes, ...data.recipes]
  }))
}

export const resetFormData = () => {
  const clearFormDataString = JSON.stringify(returnFormData()).split('"id"')[0]
  const currentFormDataString = JSON.stringify(get(formData)).split('"id"')[0]

  const firstIngredientInputID = get(formData).ingredients[0].id

  if (clearFormDataString === currentFormDataString) return

  formData.set(returnFormData(firstIngredientInputID))
  const checkboxes = [
    ...document.querySelectorAll('input[type="checkbox"]')
  ] as HTMLInputElement[]

  if (checkboxes.length > 0) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
  }
}

export const showRecipeDetails = (id: string) => {
  const section = document.querySelector(
    '[data-section="recipe-details"]'
  ) as null | HTMLDivElement

  idOfClickedRecipe.set(id)

  if (section != null) {
    scrollIntoSection(section)
  }
}
