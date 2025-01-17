import React, { useState, createContext } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toastStack, setToastStack] = useState([]);

  useEscapeKey(dismissAllToasts);

  function addToToastStack(message, selectedVariant) {
    setToastStack([
      ...toastStack,
      {
        message,
        variant: selectedVariant,
        isHidden: false,
        id: window.crypto.randomUUID(),
      },
    ]);
  }

  function removeFromToastStack(id) {
    const hiddenToastStack = [...toastStack];
    const toastToHideIndex = hiddenToastStack.findIndex(
      (toast) => toast.id === id
    );
    hiddenToastStack[toastToHideIndex].isHidden = true;
    setToastStack(hiddenToastStack);

    const removedToastStack = [...hiddenToastStack];
    removedToastStack.splice(toastToHideIndex, 1);
    window.setTimeout(() => {
      setToastStack(removedToastStack);
    }, 400);
  }

  function dismissAllToasts() {
    const hideAllToastsStack = toastStack.map((toast) => ({
      ...toast,
      isHidden: true,
    }));
    setToastStack(hideAllToastsStack);

    window.setTimeout(() => {
      setToastStack([]);
    }, 400);
  }

  return (
    <ToastContext.Provider
      value={{
        toastStack,
        addToToastStack,
        removeFromToastStack,
        dismissAllToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
