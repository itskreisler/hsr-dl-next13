import { NextResponse } from 'next/server'
export async function POST (request) {
  const { url } = await request.json()
  if (!url) {
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
    const data = await peticion.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.error(error, { status: 500 })
  }
}
