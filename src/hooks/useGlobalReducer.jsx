import { useContext, useReducer, createContext } from "react";
import PropTypes from "prop-types";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, undefined, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = { children: PropTypes.node.isRequired };

export default function useGlobalReducer() {
  return useContext(StoreContext);
}
