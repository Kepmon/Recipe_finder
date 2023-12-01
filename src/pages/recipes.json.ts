import type { APIRoute } from 'astro'
import { fetchRecipes } from '../helpers/recipes'
import { makeQueryLink } from '../stores/formStore'

let nextPageUrl = ''

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()

  const appID = import.meta.env.VITE_APP_ID
  const appKey = import.meta.env.VITE_APP_KEY
  const base = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${appKey}&type=public`
  let queryLink = ''

  if (!data.moreRecipes) {
    queryLink = makeQueryLink(data.formDataObj, base)
  }

  const recipes = await fetchRecipes(data.moreRecipes ? nextPageUrl : queryLink)
  nextPageUrl = recipes.nextPageUrl
  return recipes.recipesResponse
}
