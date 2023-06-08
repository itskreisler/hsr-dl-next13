'use client'
import Link from 'next/link'
import React from 'react'
import { useKey } from 'react-use'
import { IconCategory } from '../resources/Icons'
import { useForm } from 'react-hook-form'
import { useAppLocalStore } from '../store/storeApp'
const TagHeader = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  // variables para el menu
  const [menuOpen, setMenuOpen] = React.useState(false)
  // variables para la url de la api
  const { apiUrl, setApiUrl } = useAppLocalStore((state) => ({
    apiUrl: state.apiUrl,
    setApiUrl: state.setApiUrl
  }))
  // variables para la funcion de la api
  const fetchApiUrl = useAppLocalStore.getState().fetchApiUrl
  // variables para el formulario
  const { register, handleSubmit } = useForm()
  // funciones para el menu
  const handleClick = () => setMenuOpen(!menuOpen)
  // const handleClickOpen = () => setMenuOpen(true)
  const handleClickClose = () => setMenuOpen(false)
  const handleStopPropagation = (event) => event.stopPropagation()

  // funciones para el formulario
  const onSubmit = async ({ apiUrl }) => {
    setIsLoading(true)
    // setApiUrl(apiUrl)
    try {
      await fetchApiUrl(apiUrl)
      setMenuOpen(false)
    } catch (error) {
      console.table(error)
      alert(error.message)
      // console.log({ error: 'Failed to get update data', message: 'Fetching failed. Check if the entered link contains update data and if you have a working internet connection.' })
    } finally {
      setIsLoading(false)
    }
  }
  const handleFocus = (e) => {
    if (e.target.value.length > 0) {
      e.target.select()
    }
  }
  const handleChange = (e) => {
    console.log(e.target.value)
    setApiUrl(e.target.value?.trim())
  }

  useKey('Escape', handleClickClose)
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href='/'>
              <strong>HRS-dl</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <a href='#' onClick={handleClick} className='secondary'>
              <IconCategory />
            </a>
          </li>
        </ul>
      </nav>
      <dialog open={menuOpen} onClick={handleClickClose}>
        <article onClick={handleStopPropagation}>
          <header>
            <a
              href='#close'
              onClick={handleClickClose}
              aria-label='Close'
              className='close'
            />
            Settings
          </header>
          <div>
            <div className='grid'>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='grid'>
                    <label htmlFor='apiUrl'>
                      Update data URL
                      <input
                        type='url'
                        id='apiUrl'
                        defaultValue={apiUrl}
                        placeholder='https://hkrpg-...'
                        onFocus={handleFocus}
                        onChangeCapture={handleChange}
                        disabled={isLoading}
                        required
                        {...register('apiUrl', { required: true })}
                      />
                    </label>
                  </div>
                  <hr />
                  <div className='grid'>
                    <button type='submit' disabled={isLoading} aria-busy={isLoading}>{isLoading ? 'Please wait…' : 'Save'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </article>
      </dialog>
    </header>
  )
}

export default TagHeader
