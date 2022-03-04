import { useEffect, useState } from "react";
import styles from "./Contents.module.css";

function Contents({ open, close, image, date, content }) {
  const day = `${date.substring(0, 4)}년 ${date.substring(
    4,
    6
  )}월 ${date.substring(6, 8)}일 ${date.substring(8, 10)}시 ${date.substring(
    10,
    12
  )}분`;
  return (
    <div className={open === date ? styles.openModal : styles.modal}>
      {open === date ? (
        <section>
          <header>👩‍🚀중규리 님의 ArtWorks👩‍🚀</header>
          <main>
            <img src={image} alt={image} />
            <h5>{day}</h5>
            <p>{content}</p>
          </main>
          <footer>
            <button onClick={() => close("")}>Close</button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default Contents;
