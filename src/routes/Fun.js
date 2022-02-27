import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";

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
  //배너 받아오기
  useEffect(async () => {
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
      }
    }
  }, []);
  console.log(banner);
  return <div>운세</div>;
}

export default Fun;
