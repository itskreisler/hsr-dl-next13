/**
 * @typedef {object} TypesEnv
 * @property {string} DEMO_KEY - demo key
 */

/**
 * @typedef {object} TypesHelpers
 * @property {TypesEnv} ENV - envaironment variables
 */
/**
 * @typedef {object} TypesUseOnSubmit
 * @property {import('react').useRef} refForm - reference to form
 * @property {string} url - url to fetch
 */

/**
 * @param {TypesUseOnSubmit} args - arguments
 *
 */
const useOnSubmit = async ({ refForm, url }) => {
  const formData = Object.fromEntries(new FormData(refForm))
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const respuesta = await response.json()
  return respuesta
}
/**
 * @type {TypesHelpers}
 *
 */
export const helpers = {
  ENV: { ...process.env },
  useOnSubmit
}
