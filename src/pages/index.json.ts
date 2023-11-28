import { makeQueryLink } from '../stores/formStore'

// eslint-disable-next-line no-undef
let formDataObj: { [k: string]: FormDataEntryValue }
let hasNextPage = false
let nextPageUrl = ''

export const POST = async ({ request }) => {
  const data = await request.json()

  formDataObj = data.formDataObj

  return new Response(JSON.stringify(data))
}

export const GET: () => Promise<Response | undefined> = async () => {
  const appID = import.meta.env.VITE_APP_ID
  const appKey = import.meta.env.VITE_APP_KEY
  const base = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${appKey}&type=public`

  const queryLink = makeQueryLink(formDataObj, base)
  const response = await fetch(queryLink)
  const data = await response.json()

  hasNextPage = Object.keys(data._links).length > 0
  nextPageUrl = hasNextPage ? data._links.next.href : ''

  return new Response(
    JSON.stringify({
      hasNextPage,
      recipes: data.hits.map(({ recipe }) => recipe)
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
