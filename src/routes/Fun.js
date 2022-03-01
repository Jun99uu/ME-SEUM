import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const db = getFirestore();
function Fun() {
  const [banner, setBanner] = useState([
    {
      url: "",
      date: "",
      link: "",
      explain: "",
    },
  ]);
  const [images, setImg] = useState([""]);

  //배너 받아오기
  useEffect(async () => {
    setImg([]);
    const docRef = doc(db, "banners", "documents");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const objs = docSnap._document.data.value.mapValue.fields;
      for (let key in objs) {
        setBanner((prevState) => [
          ...prevState,
          {
            url: objs[key].arrayValue.values[0].stringValue,
            date: objs[key].arrayValue.values[1].stringValue,
            link: objs[key].arrayValue.values[2].stringValue,
            explain: objs[key].arrayValue.values[3].stringValue,
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

  return (
    <div>
      {images.map((image) => (
        <img src={image} />
      ))}
    </div>
  );
}

export default Fun;
