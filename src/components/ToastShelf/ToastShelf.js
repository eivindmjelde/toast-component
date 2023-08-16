import React, { useContext } from "react";
import clsx from "clsx";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../providers/ToastProvider";

function ToastShelf() {
  const { toastStack, removeFromToastStack } = useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
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
