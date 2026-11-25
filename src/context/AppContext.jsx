import { createContext, useContext, useReducer } from 'react'
import {
  PRODUCTS,
  INITIAL_PANTRY,
  INITIAL_SHOPPING_LIST,
  INITIAL_HISTORY,
  INITIAL_IMPACT,
  NOTA_EXAMPLES,
  avgPrice,
} from '../data/initialData'

const AppContext = createContext(null)

function initialState() {
  return {
    pantry: { ...INITIAL_PANTRY },
    shoppingList: INITIAL_SHOPPING_LIST.map((item) => ({ ...item })),
    history: INITIAL_HISTORY.map((entry) => ({ ...entry })),
    impact: { ...INITIAL_IMPACT },
    lastScan: null,
    profile: null,
    introStage: 'team',
  }
}

function formatDateToday() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function reducer(state, action) {
  switch (action.type) {
    case 'SCAN_NOTA': {
      const nota = NOTA_EXAMPLES.find((n) => n.id === action.notaId)
      if (!nota) return state

      const newPantry = { ...state.pantry }
      nota.items.forEach((item) => {
        newPantry[item.productId] = 100
      })

      const total = nota.items.reduce((sum, item) => sum + item.price, 0)
      const newEntry = {
        id: `h-${Date.now()}`,
        date: formatDateToday(),
        market: nota.market,
        total,
        items: nota.items.map((item) => item.label),
      }

      return {
        ...state,
        pantry: newPantry,
        history: [newEntry, ...state.history],
        lastScan: nota,
      }
    }

    case 'TOGGLE_CHECK': {
      return {
        ...state,
        shoppingList: state.shoppingList.map((item) =>
          item.productId === action.productId ? { ...item, checked: !item.checked } : item
        ),
      }
    }

    case 'CHANGE_QTY': {
      return {
        ...state,
        shoppingList: state.shoppingList.map((item) =>
          item.productId === action.productId
            ? { ...item, qty: Math.max(1, item.qty + action.delta) }
            : item
        ),
      }
    }

    case 'ADD_ITEM': {
      const exists = state.shoppingList.some((item) => item.productId === action.productId)
      if (exists) return state
      return {
        ...state,
        shoppingList: [...state.shoppingList, { productId: action.productId, qty: 1, checked: false }],
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        shoppingList: state.shoppingList.filter((item) => item.productId !== action.productId),
      }
    }

    case 'DECLINE_ADD_SAVE': {
      const price = avgPrice(action.productId)
      return {
        ...state,
        impact: {
          savings: Math.round((state.impact.savings + price) * 100) / 100,
          packagesAvoided: state.impact.packagesAvoided + 1,
        },
      }
    }

    case 'ADVANCE_INTRO': {
      const INTRO_ORDER = ['team', 'persona', 'system', 'revenue']
      const currentIndex = INTRO_ORDER.indexOf(state.introStage)
      const next = INTRO_ORDER[currentIndex + 1] ?? 'revenue'
      return {
        ...state,
        introStage: next,
      }
    }

    case 'SET_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      }
    }

    case 'RESET': {
      return initialState()
    }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  const value = {
    state,
    dispatch,
    products: PRODUCTS,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider')
  return ctx
}
