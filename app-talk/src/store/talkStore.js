import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


const useTalkStore = create(persist((set) => ({
  talks: [],
  

  addTalk: (newTalk) => set((state) => ({
    talks: [...state.talks, newTalk]
  })),
  removeTalk: (talkId) => set((state) => ({
    talks: state.talks.filter(talk => talk.id !== talkId)
  })),
  updateTalk: (updatedTalk) => set((state) => ({
    talks: state.talks.map(talk => 
      talk.id === updatedTalk.id ? updatedTalk : talk
    )
  })),
  getTalkById: (talkId) => {
    return useTalkStore.getState().talks.find(talk => talk.id === talkId);
  },
  clearTalks: () => set({ talks: [] }),
})));

const name = 'talk-store';
const storage = createJSONStorage(() => localStorage);

export default useTalkStore;
