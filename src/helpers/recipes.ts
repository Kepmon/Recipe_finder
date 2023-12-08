import type { RecipeResponse } from '../types/recipes'
import { nanoid } from 'nanoid'

export const fetchRecipes = async (url: string) => {
  let nextPageUrl = ''
  let recipesResponse: Response

  try {
    const response = await fetch(url)
    const data = (await response.json()) as RecipeResponse

    if ('status' in data && data.status === 'error')
      throw new Error('sth-wrong')

    if ('hits' in data && data.hits.length === 0) throw new Error('no-results')

    const hasNextPage = Object.keys(data._links).length > 0
    nextPageUrl = hasNextPage ? data._links.next.href : ''

    recipesResponse = new Response(
      JSON.stringify({
        hasNextPage,
        recipes: data.hits.map(({ recipe }) => ({
          id: nanoid(),
          label: recipe.label,
          images: recipe.images,
          calories: recipe.calories,
          totalWeight: recipe.totalWeight,
          ingredientLines: recipe.ingredientLines,
          url: recipe.url,
          totalTime: recipe.totalTime,
          yield: recipe.yield,
          totalNutrients: {
            FAT: recipe.totalNutrients.FAT,
            FASAT: recipe.totalNutrients.FASAT,
            FATRN: recipe.totalNutrients.FATRN,
            CHOCDF: recipe.totalNutrients.CHOCDF,
            SUGAR: recipe.totalNutrients.SUGAR,
            PROCNT: recipe.totalNutrients.PROCNT,
            FIBTG: recipe.totalNutrients.FIBTG,
            NA: recipe.totalNutrients.NA
          },
          dietLabels: recipe.dietLabels,
          healthLabels: recipe.healthLabels
        }))
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (err) {
    nextPageUrl = ''
    recipesResponse = new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'sth-wrong'
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  return { nextPageUrl, recipesResponse }
}
