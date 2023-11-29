import type { APIRoute } from 'astro'
import { fetchRecipes } from '../helpers/recipes'
import { makeQueryLink } from '../stores/formStore'

let formDataObj: Record<string, string>
let nextPageUrl = ''

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()

  formDataObj = data.formDataObj

  return new Response(JSON.stringify(data))
}

export const GET: () => Promise<Response | undefined> = async () => {
  const appID = import.meta.env.VITE_APP_ID
  const appKey = import.meta.env.VITE_APP_KEY
  const base = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${appKey}&type=public`
  const queryLink = makeQueryLink(formDataObj, base)

  const recipes = await fetchRecipes(
    nextPageUrl === '' ? queryLink : nextPageUrl
  )
  nextPageUrl = recipes.nextPageUrl
  return recipes.recipesResponse
}
