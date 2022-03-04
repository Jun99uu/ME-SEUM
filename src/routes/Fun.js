import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Banners from "../components/Banners";

const storage = getStorage();
const db = getFirestore();
function Fun() {
  const [banner, setBanner] = useState([
    {
      date: "",
      link: "",
      explain: "",
      image: "",
    },
  ]);
  const [modal, setModal] = useState("");

  //배너 받아오기
  useEffect(async () => {
    setBanner([]);
    const docRef = doc(db, "banners", "documents");
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
            setBanner((prevState) => [
              ...prevState,
              {
                date: objs[key].arrayValue.values[1].stringValue,
                link: objs[key].arrayValue.values[2].stringValue,
                explain: objs[key].arrayValue.values[3].stringValue,
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
      {banner.map((banner) => (
        <div key={banner.date}>
          <img src={banner.image} />
          <button onClick={() => modalChange(banner.date)}>열기</button>
          <Banners
            open={modal}
            close={modalChange}
            image={banner.image}
            date={banner.date}
            explain={banner.explain}
            link={banner.link}
          />
        </div>
      ))}
    </div>
  );
}

export default Fun;
