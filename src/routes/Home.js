import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const db = getFirestore();
function Home({ userName, userMbti }) {
  const [name, setName] = useState(userName);
  const [mbti, setMbti] = useState(userMbti);

  const [card, setCard] = useState([
    {
      url: "",
      date: "",
      content: "",
    },
  ]);

  const [images, setImg] = useState([""]);

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
    setImg([]);
    setCard([]);
    const docRef = doc(db, "artworks", "documents");
    const docSnap = await getDoc(docRef);
    const storage = getStorage();
    if (docSnap.exists()) {
      const objs = docSnap._document.data.value.mapValue.fields;
      for (let key in objs) {
        setCard((prevState) => [
          ...prevState,
          {
            url: objs[key].arrayValue.values[0].stringValue,
            date: objs[key].arrayValue.values[1].stringValue,
            content: objs[key].arrayValue.values[2].stringValue,
          },
        ]);
        getDownloadURL(ref(storage, objs[key].arrayValue.values[0].stringValue))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            setImg((prevState) => [...prevState, url]);
          })
          .catch((error) => {
            // Handle any errors
          });
      }
    }
  }, []);

  console.log(images);
  return (
    <div>
      {images.map((image) => (
        <img src={image} />
      ))}
    </div>
  );
}
export default Home;
