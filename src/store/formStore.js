import { create } from 'zustand';

const useFormStore = create((set) => ({
  forms: [],
  currentForm: null,
  isLoading: false,
  error: null,

  setForms: (forms) => set({ forms }),
  
  setCurrentForm: (form) => set({ currentForm: form }),
  
  addForm: (form) => set((state) => ({
    forms: [form, ...state.forms]
  })),
  
  updateForm: (formId, updates) => set((state) => ({
    forms: state.forms.map(f => 
      f._id === formId ? { ...f, ...updates } : f
    ),
    currentForm: state.currentForm?._id === formId 
      ? { ...state.currentForm, ...updates }
      : state.currentForm
  })),
  
  deleteForm: (formId) => set((state) => ({
    forms: state.forms.filter(f => f._id !== formId)
  })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error })
}));

export default useFormStore;
