import type { RecipeResponse } from '../types/recipes'
import { nanoid } from 'nanoid'

export const fetchRecipes = async (url: string) => {
  let nextPageUrl = ''
  let recipesResponse: Response

  try {
    const response = await fetch(url)
    const data = (await response.json()) as RecipeResponse

    if ('status' in data && data.status === 'error') throw new Error()

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
          yield: recipe.yield
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
    recipesResponse = new Response(null, {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return { nextPageUrl, recipesResponse }
}