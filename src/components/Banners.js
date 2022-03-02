import { useEffect, useState } from "react";

function Banners({ open, close, image, date, link, explain }) {
  return (
    <div>
      {open === date ? (
        <section>
          <header>👩‍🚀중규리의 ToyProject👩‍🚀</header>
          <main>
            <a href={link}>
              <img src={image} alt={image} />
            </a>
            <h5>{date}</h5>
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
