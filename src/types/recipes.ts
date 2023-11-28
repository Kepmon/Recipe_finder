export type Recipe = {
  label: string
  images: {
    SMALL: {
      width: number
      height: number
      url: string
    }
  }
  calories: number
  totalWeight: number
  ingredientLines: string[]
  url: string
  totalTime: number
  yield: number
}

export type RecipesData = {
  hasNextPage: boolean
  recipes: Recipe[]
}

export type RecipeResponse = {
  from: number
  to: number
  count: number
  _links: {
    next: {
      href: string
      title: string
    }
  }
  hits: { recipe: Recipe }[]
}
