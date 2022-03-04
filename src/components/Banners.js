import { useEffect, useState } from "react";
import styles from "./Banners.module.css";

function Banners({ open, close, image, date, link, explain }) {
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
          <header>👩‍🚀중규리의 ToyProject👩‍🚀</header>
          <main>
            <a href={link} target="_blank">
              <img src={image} alt={image} />
            </a>
            <h5>{day}</h5>
            <p>{explain}</p>
          </main>
          <footer>
            <button onClick={() => close("")}>Close</button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default Banners;
