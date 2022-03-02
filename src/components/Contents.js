import { useEffect, useState } from "react";

function Contents({ open, close, image, date, content }) {
  return (
    <div>
      {open === date ? (
        <section>
          <header>👩‍🚀중규리 님의 ArtWorks👩‍🚀</header>
          <main>
            <img src={image} alt={image} />
            <h5>{date}</h5>
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
