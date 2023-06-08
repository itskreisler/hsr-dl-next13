'use client'
import { useRef } from 'react'
import styles from './page.module.css'

export default function Home () {
  const refForm = useRef(null)
  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(refForm.current))
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const respuesta = await response.json()
    console.log({ respuesta })
  }

  return (
    <main className={styles.main}>
      <form onSubmit={onSubmit} ref={refForm}>
        <div>
          <label htmlFor='url'>url</label>
          <input id='url' name='url' type='text' required />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </main>
  )
}
