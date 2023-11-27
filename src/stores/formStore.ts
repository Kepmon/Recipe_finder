// eslint-disable-next-line import/no-unresolved
import { writable } from 'svelte/store'
import { nanoid } from 'nanoid'

export const isFormSubmitted = writable(false)
export const formErrors = writable({
  noFieldFilled: '',
  negativeCalories: ''
})

export const formData = writable({
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
      id: nanoid()
    }
  ]
})

// eslint-disable-next-line no-undef
const validateForm = (formDataObj: { [k: string]: FormDataEntryValue }) => {
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
    return false
  }

  if (formDataKeys.every((key) => formDataObj[key] === '')) {
    formErrors.set({
      noFieldFilled: 'At least one form section has to be filled in',
      negativeCalories: ''
    })
    return false
  }

  return true
}

export const handleSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement
  const formDataInstance = new FormData(form)
  const formDataObj = Object.fromEntries(formDataInstance)

  const isFormValid = validateForm(formDataObj)

  if (!isFormValid) return
}
