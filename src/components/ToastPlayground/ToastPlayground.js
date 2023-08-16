import React, { useContext } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import { ToastContext } from "../providers/ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";

export const VARIANT_OPTIONS = Object.freeze({
  Notice: "notice",
  Warning: "warning",
  Success: "success",
  Error: "error",
});

function ToastPlayground() {
  console.log("ToastPlayground rendered");

  const {
    message,
    setMessage,
    selectedVariant,
    setSelectedVariant,
    addToToastStack,
  } = useContext(ToastContext);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addToToastStack();
        }}
        className={styles.controlsWrapper}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {Object.values(VARIANT_OPTIONS).map((variant) => (
              <label key={variant} htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={variant === selectedVariant}
                  onChange={() => {
                    setSelectedVariant(variant);
                  }}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
