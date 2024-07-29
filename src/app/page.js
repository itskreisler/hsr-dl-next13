'use client'
// import styles from './styles/page.module.css'
import { useEffect, useState } from 'react'
import TagHeader from './components/TagHeader'
import TagPre from './components/TagPre'
import { useAppStore } from './store/storeApp'

export default function Home() {
  const dataHsr = useAppStore(state => state.dataHsr)
  const [data, setData] = useState(null);
  const apiUrl = 'https://hkrpg-launcher.hoyoverse.com/hkrpg_global/mdk/launcher/api/resource?launcher_id=35&key=vplOVX8Vn7cwG8yb'
  useEffect(() => {
    const fetchData = async () => {
      try {


        const response = await globalThis.fetch('/api/hsr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: apiUrl })
        })
        const data = await response.json()
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };

  if (!data) {
    return (
      <main className='container'>
        <TagHeader />
        <div className='grid'>
          <div>
            <h1>Loading...</h1>
          </div>
          <div>
            <TagPre json={dataHsr} />
          </div>
        </div>
      </main>
    );
  }

  const gameData = data.data.game.latest;
  return (
    <main className='container'>
      <TagHeader />
      <div className='grid'>
        <div>
          <div className="App">
            <div className="section">
              <h2>Latest Game Version</h2>
              <p><strong>Api:</strong> <a href={gameData.path} target="_blank" rel="noopener noreferrer">{apiUrl}</a></p>
              <p><strong>Version:</strong> {gameData.version}</p>
              <p><strong>Download Path:</strong> <a href={gameData.path} target="_blank" rel="noopener noreferrer">{gameData.path}</a></p>
              <p><strong>Size:</strong> {formatSize(gameData.size)}</p>
              <p><strong>MD5:</strong> {gameData.md5}</p>
              <p><strong>Entry:</strong> {gameData.entry}</p>
            </div>
            <div className="section">
              <h2>Voice Packs</h2>
              {gameData.voice_packs.map((pack, index) => (
                <div key={index} className="voice-pack">
                  <h3>Language: {pack.language}</h3>
                  <p><strong>Download Path:</strong> <a href={pack.path} target="_blank" rel="noopener noreferrer">{pack.path}</a></p>
                  <p><strong>Size:</strong> {formatSize(pack.size)}</p>
                  <p><strong>MD5:</strong> {pack.md5}</p>
                  <p><strong>Package Size:</strong> {formatSize(pack.package_size)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <TagPre json={dataHsr} />
        </div>
      </div>
    </main>
  )
}
