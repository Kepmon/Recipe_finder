type ImgProperties = {
  width: number
  height: number
  url: string
}

type NutrientProperties = {
  label: string
  quantity: number
  unit: string
}

export type Recipe = {
  id: string
  label: string
  images: {
    THUMBNAIL: ImgProperties
    SMALL: ImgProperties
    REGULAR: ImgProperties
    LARGE: ImgProperties
  }
  calories: number
  totalWeight: number
  ingredientLines: string[]
  url: string
  totalTime: number
  yield: number
  totalNutrients: {
    FAT: NutrientProperties
    FASAT: NutrientProperties
    FATRN: NutrientProperties
    CHOCDF: NutrientProperties
    SUGAR: NutrientProperties
    PROCNT: NutrientProperties
    FIBTG: NutrientProperties
    NA: NutrientProperties
  }
  dietLabels: string[]
  healthLabels: string[]
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
