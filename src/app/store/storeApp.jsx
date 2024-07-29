import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import { shallow } from 'zustand/shallow'
export const useAppStore = create((set, get) => ({
  dataHsr: {},
  setDataHsr: (data) => set({ dataHsr: data })
}))
// export const useAppStoreShallow = useAppStore((state) => ({ ...state }), shallow)

/**
 * @description guarda la url de la api en el localstorage
 */
export const useAppLocalStore = create(
  persist(
    (set, get) => ({
      apiUrl: 'https://hkrpg-launcher.hoyoverse.com/hkrpg_global/mdk/launcher/api/resource?launcher_id=35&key=vplOVX8Vn7cwG8yb',
      // dataHsr: {},
      setApiUrl: (url) => set({ apiUrl: url }),
      fetchApiUrl: async () => {
        const response = await globalThis.fetch('/api/hsr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: get().apiUrl })
        })
        const data = await response.json()
        const setDataHsr = useAppStore.getState().setDataHsr
        setDataHsr(data)
        // set({ dataHsr: await response.json() })
      },
      removeApiUrl: () => set({ apiUrl: '' }),
      removeDataHsr: () => set({ dataHsr: {} }),
      removeAll: () => set({ apiUrl: '', dataHsr: {} })
    }),
    {
      name: 'useAppLocalStore', // unique name
      storage: createJSONStorage(() => window.localStorage) // (optional) by default, 'localStorage' is used
    }
  )
)
