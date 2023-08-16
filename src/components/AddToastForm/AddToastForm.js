import React from "react";
import { VARIANT_OPTIONS } from "../ToastPlayground";
import { ToastContext } from "../providers/ToastProvider";
import styles from "./AddToastForm.module.css";
import Button from "../Button";

function AddToastForm() {
  const [message, setMessage] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState(
    VARIANT_OPTIONS.Notice
  );

  function resetCurrentToastState() {
    setMessage("");
    setSelectedVariant(VARIANT_OPTIONS.Notice);
  }

  const { addToToastStack } = React.useContext(ToastContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addToToastStack(message, selectedVariant);
        resetCurrentToastState();
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
  );
}

export default AddToastForm;
