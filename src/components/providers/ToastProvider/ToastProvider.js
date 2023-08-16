import React, { useState, createContext } from "react";
import { VARIANT_OPTIONS } from "../../ToastPlayground";
export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(
    VARIANT_OPTIONS.Notice
  );
  const [toastStack, setToastStack] = useState([]);

  function resetCurrentToastState() {
    setMessage("");
    setSelectedVariant(VARIANT_OPTIONS.Notice);
  }

  function addToToastStack() {
    setToastStack([
      ...toastStack,
      {
        message,
        variant: selectedVariant,
        isHidden: false,
        id: window.crypto.randomUUID(),
      },
    ]);

    resetCurrentToastState();
  }

  function removeFromToastStack(id) {
    const modifiedStack = [...toastStack];
    const index = modifiedStack.findIndex((toast) => toast.id === id);
    modifiedStack[index].isHidden = true;
    setToastStack(modifiedStack);
    const removedStack = [...modifiedStack];
    removedStack.splice(index, 1);
    window.setTimeout(() => {
      setToastStack(removedStack);
    }, 400);
  }

  return (
    <ToastContext.Provider
      value={{
        message,
        setMessage,
        selectedVariant,
        setSelectedVariant,
        toastStack,
        addToToastStack,
        removeFromToastStack,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
