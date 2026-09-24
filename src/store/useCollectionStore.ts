import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CaughtPokemon = {
  name: string;
  caughtAt: string;
};

interface CollectionState {
  collection: CaughtPokemon[];
  catchPokemon: (name: string) => void;
  releasePokemon: (name: string) => void;
  isCaught: (name: string) => boolean;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      collection: [],
      catchPokemon: (name) => {
        if (get().isCaught(name)) return;

        set((state) => ({
          collection: [
            ...state.collection, 
            { name, caughtAt: new Date().toISOString() }
          ],
        }));
      },
      releasePokemon: (name) => {
        set((state) => ({
          collection: state.collection.filter((p) => p.name !== name),
        }));
      },
      isCaught: (name) => get().collection.some((p) => p.name === name),
    }),
    { name: 'pokemon-collection' }
  )
);