import React, { useContext, useEffect } from "react";
import clsx from "clsx";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../providers/ToastProvider";

function ToastShelf() {
  const { toastStack, removeFromToastStack, dismissAllToasts } =
    useContext(ToastContext);

  useEffect(() => {
    function handleEscKeypress(e) {
      if (e.code === "Escape") {
        dismissAllToasts();
      }
    }

    window.addEventListener("keydown", handleEscKeypress);

    return () => {
      window.removeEventListener("keydown", handleEscKeypress);
    };
  }, [dismissAllToasts]);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toastStack.map(({ id, message, variant, isHidden }) => (
        <li
          key={id}
          className={clsx(styles.toastWrapper, isHidden && styles.slideOut)}
        >
          <Toast
            message={message}
            variant={variant}
            onDismiss={() => removeFromToastStack(id)}
          />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
