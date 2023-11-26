// eslint-disable-next-line import/no-unresolved
import { writable } from 'svelte/store'
import { nanoid } from 'nanoid'

export const isFormSubmitted = writable(false)

export const formData = writable({
  q: '',
  calories: {
    from: '',
    to: ''
  },
  diet: {
    isExpanded: false,
    items: [
      {
        name: 'Balanced',
        isChosen: false
      },
      {
        name: 'High-fiber',
        isChosen: false
      },
      {
        name: 'High-protein',
        isChosen: false
      },
      {
        name: 'Low-carb',
        isChosen: false
      },
      {
        name: 'Low-fat',
        isChosen: false
      },
      {
        name: 'Low-sodium',
        isChosen: false
      }
    ]
  },
  dishType: {
    isExpanded: false,
    items: [
      {
        name: 'Alcohol cocktail',
        isChosen: false
      },
      {
        name: 'Biscuits and cookies',
        isChosen: false
      },
      {
        name: 'Bread',
        isChosen: false
      },
      {
        name: 'Cereals',
        isChosen: false
      },
      {
        name: 'Condiments and sauces',
        isChosen: false
      },
      {
        name: 'Desserts',
        isChosen: false
      },
      {
        name: 'Drinks',
        isChosen: false
      },
      {
        name: 'Egg',
        isChosen: false
      },
      {
        name: 'Ice cream and custard',
        isChosen: false
      },
      {
        name: 'Main course',
        isChosen: false
      },
      {
        name: 'Pancake',
        isChosen: false
      },
      {
        name: 'Pasta',
        isChosen: false
      },
      {
        name: 'Pastry',
        isChosen: false
      },
      {
        name: 'Pies and tarts',
        isChosen: false
      },
      {
        name: 'Pizza',
        isChosen: false
      },
      {
        name: 'Preps',
        isChosen: false
      },
      {
        name: 'Preserve',
        isChosen: false
      },
      {
        name: 'Salad',
        isChosen: false
      },
      {
        name: 'Sandwiches',
        isChosen: false
      },
      {
        name: 'Seafood',
        isChosen: false
      },
      {
        name: 'Side dish',
        isChosen: false
      },
      {
        name: 'Soup',
        isChosen: false
      },
      {
        name: 'Special occasions',
        isChosen: false
      },
      {
        name: 'Starter',
        isChosen: false
      },
      {
        name: 'Sweets',
        isChosen: false
      }
    ]
  },
  cuisineType: {
    isExpanded: false,
    items: [
      {
        name: 'American',
        isChosen: false
      },
      {
        name: 'Asian',
        isChosen: false
      },
      {
        name: 'British',
        isChosen: false
      },
      {
        name: 'Caribbean',
        isChosen: false
      },
      {
        name: 'Central europe',
        isChosen: false
      },
      {
        name: 'Eastern europe',
        isChosen: false
      },
      {
        name: 'French',
        isChosen: false
      },
      {
        name: 'Greek',
        isChosen: false
      },
      {
        name: 'Indian',
        isChosen: false
      },
      {
        name: 'Italian',
        isChosen: false
      },
      {
        name: 'Japanese',
        isChosen: false
      },
      {
        name: 'Korean',
        isChosen: false
      },
      {
        name: 'Kosher',
        isChosen: false
      },
      {
        name: 'Mediterranean',
        isChosen: false
      },
      {
        name: 'Mexican',
        isChosen: false
      },
      {
        name: 'Middle eastern',
        isChosen: false
      },
      {
        name: 'Nordic',
        isChosen: false
      },
      {
        name: 'South american',
        isChosen: false
      },
      {
        name: 'South east asian',
        isChosen: false
      },
      {
        name: 'World',
        isChosen: false
      }
    ]
  },
  health: {
    isExpanded: false,
    items: [
      {
        name: 'Alcohol-free',
        isChosen: false
      },
      {
        name: 'Dairy-free',
        isChosen: false
      },
      {
        name: 'DASH',
        isChosen: false
      },
      {
        name: 'Egg-free',
        isChosen: false
      },
      {
        name: 'Fish-free',
        isChosen: false
      },
      {
        name: 'FODMAP-free',
        isChosen: false
      },
      {
        name: 'Gluten-free',
        isChosen: false
      },
      {
        name: 'Keto-friendly',
        isChosen: false
      },
      {
        name: 'Kidney-friendly',
        isChosen: false
      },
      {
        name: 'Paleo',
        isChosen: false
      },
      {
        name: 'Peanut-free',
        isChosen: false
      },
      {
        name: 'Pescatarian',
        isChosen: false
      },
      {
        name: 'Soy-free',
        isChosen: false
      },
      {
        name: 'Vegan',
        isChosen: false
      },
      {
        name: 'Vegetarian',
        isChosen: false
      },
      {
        name: 'Wheat-free',
        isChosen: false
      }
    ]
  },
  ingredients: [
    {
      name: '',
      id: nanoid()
    }
  ]
})

export const handleSubmit = () => {
  console.log('form submitted')
}
