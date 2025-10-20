import { createGlobalState } from "react-hooks-global-state"

const initialState = { user: null }
const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState)

export { useGlobalState, getGlobalState, setGlobalState }