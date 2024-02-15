import { create } from 'zustand'

interface IModal {
  isModalOpen: boolean
  isPanelOpen: boolean
  openModal: () => void
  closeModal: () => void
  openPanel: () => void
  closePanel: () => void
}

export const useModal = create<IModal>()((set) => ({
  isModalOpen: false,
  isPanelOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
}))
