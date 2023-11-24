import { writable } from 'svelte/store'

export const formData = writable({
  name: '',
  calories: {
    from: '',
    to: ''
  },
  dietType: {
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
  healthLabel: {
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
  ingredients: ['']
})
