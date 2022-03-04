import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Contents from "../components/Contents";
import styles from "./Home.module.css";

const storage = getStorage();
const db = getFirestore();
function Home({ userName, userMbti }) {
  const [name, setName] = useState(userName);
  const [mbti, setMbti] = useState(userMbti);

  const [modal, setModal] = useState("");

  const [card, setCard] = useState([
    {
      date: "",
      content: "",
      image: "",
    },
  ]);

  useEffect(() => {
    if (name === "" && mbti === "") {
      setName(sessionStorage.getItem("name"));
      setMbti(sessionStorage.getItem("mbti"));
    } else {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("mbti", mbti);
    }
  }, []);

  // 그림 받아오기
  useEffect(async () => {
    setCard([]);
    const docRef = doc(db, "artworks", "documents");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const objs = docSnap._document.data.value.mapValue.fields;
      for (let key in objs) {
        getDownloadURL(ref(storage, objs[key].arrayValue.values[0].stringValue))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            setCard((prevState) => [
              ...prevState,
              {
                date: objs[key].arrayValue.values[1].stringValue,
                content: objs[key].arrayValue.values[2].stringValue,
                image: url,
              },
            ]);
          })
          .catch((error) => {
            // Handle any errors
          });
      }
    }
  }, []);

  const modalChange = (infor) => {
    setModal(infor);
  };

  return (
    <div>
      {card.map((card) => (
        <div key={card.date}>
          <img src={card.image} />
          <button onClick={() => modalChange(card.date)}>Open</button>
          <Contents
            open={modal}
            close={modalChange}
            image={card.image}
            date={card.date}
            content={card.content}
          />
        </div>
      ))}
    </div>
  );
}
export default Home;
