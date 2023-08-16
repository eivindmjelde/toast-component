import React from "react";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import AddToastForm from "../AddToastForm/AddToastForm";

export const VARIANT_OPTIONS = Object.freeze({
  Notice: "notice",
  Warning: "warning",
  Success: "success",
  Error: "error",
});

function ToastPlayground() {
  console.log("ToastPlayground rendered");
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <AddToastForm />
      <ToastShelf />
    </div>
  );
}

export default ToastPlayground;
