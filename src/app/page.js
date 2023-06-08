'use client'
// import styles from './styles/page.module.css'

import TagHeader from './components/TagHeader'
import TagPre from './components/TagPre'
import { useAppStore } from './store/storeApp'

export default function Home () {
  const dataHsr = useAppStore(state => state.dataHsr)
  return (
    <main className='container'>
      <TagHeader />
      <div className='grid'>
        <div>
          <TagPre json={dataHsr} />
        </div>
      </div>
    </main>
  )
}
