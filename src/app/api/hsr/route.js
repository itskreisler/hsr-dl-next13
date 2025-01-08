import { NextResponse } from 'next/server'
/**
 *
 * @param {import('next/server').NextRequest} request
 * @returns
 */
async function Api (request) {
  const { url } = await request.json()
  if (typeof url === 'undefined') {
    return NextResponse.json({ error: 'url', message: 'Url is required' })
  }
  try {
    (new URL(url)).toString()
  } catch (error) {
    return NextResponse.json({ error: 'url', message: 'Url is invalid' })
  }
  // const url = 'https://hkrpg-launcher.hoyoverse.com/hkrpg_global/mdk/launcher/api/resource?launcher_id=35&key=vplOVX8Vn7cwG8yb'
  try {
    const peticion = await fetch(url, {
      // mode: 'no-cors',
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    })
    const [error, data] = (async () => {
      try {
        return [null, await peticion.json()]
      } catch (e) {
        return [e, null]
      }
    })()
    if (error) return NextResponse.json({ html: peticion.text() })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.error(error, { status: 500 })
  }
}

export async function POST (request) {
  return Api(request)
}
export async function GET (request) {
  return Api(request)
}
