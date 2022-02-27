import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const storage = getStorage();
const db = getFirestore();

function Admin() {
  const auth = getAuth();
  const [logined, setLogined] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const [attachment, setAttachment] = useState(); //그림 이미지
  const [artwork, setArtwork] = useState(""); //그림
  const [content, setContent] = useState(""); //그림 설명

  const [viewer, setViewer] = useState(); //배너 이미지
  const [banner, setBanner] = useState(""); //배너
  const [explain, setExplain] = useState(""); //배너 설명
  const [link, setLink] = useState("");

  const [date, setDate] = useState("");
  const updateDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = today.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let hours = today.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let seconds = today.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    let todate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    setDate(todate);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogined(true);
      } else {
        setLogined(false);
      }
    });
    updateDate();
  }, []);

  const loginChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPwd(e.target.value);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        setLogined(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const onChange = (e) => {
    if (e.target.name === "file") {
      const {
        target: { files, value },
      } = e;
      const theFile = files[0];
      const reader = new FileReader();
      setArtwork(value);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    } else if (e.target.name === "text") {
      setContent(e.target.value);
    }
  };

  const onBannerChange = (e) => {
    if (e.target.name === "file") {
      const {
        target: { files, value },
      } = e;
      const theFile = files[0];
      const reader = new FileReader();
      setBanner(value);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setViewer(result);
      };
      reader.readAsDataURL(theFile);
    } else if (e.target.name === "text") {
      setExplain(e.target.value);
    } else if (e.target.name === "link") {
      setLink(e.target.value);
    }
  };

  const artSubmit = (e) => {
    e.preventDefault();
    const random = `artwork/${uuidv4()}`;
    const artRef = ref(storage, random);
    if (attachment !== "") {
      uploadString(artRef, attachment, "data_url").then((snapshot) => {
        const Ref = doc(db, "artworks", "documents");
        setDoc(
          Ref,
          { [`${date}-${uuidv4()}`]: [random, date, content] },
          { merge: true }
        ).then(() => {
          navigate("/home");
        });
      });
    }
  };

  const bannerSubmit = (e) => {
    e.preventDefault();
    const random = `banner/${uuidv4()}`;
    const bannerRef = ref(storage, random);
    if (attachment !== "") {
      uploadString(bannerRef, viewer, "data_url").then((snapshot) => {
        const Ref = doc(db, "banners", "documents");
        setDoc(
          Ref,
          { [`${date}-${uuidv4()}`]: [random, date, link, explain] },
          { merge: true }
        ).then(() => {
          navigate("/home");
        });
      });
    }
  };

  return (
    <div>
      {logined ? (
        <div>
          <div>
            <h3>그림 등록</h3>
            <form onSubmit={artSubmit}>
              <img src={attachment} />
              <input
                name="file"
                type="file"
                accept="image/*"
                value={artwork}
                onChange={onChange}
                required
              />
              <br />
              <input
                type="text"
                name="text"
                value={content}
                onChange={onChange}
                placeholder="그림 설명 입력"
                required
              />
              <br />
              <button>등록</button>
            </form>
          </div>
          <div>
            <h3>배너 등록</h3>
            <form onSubmit={bannerSubmit}>
              <img src={viewer} />
              <input
                name="file"
                type="file"
                accept="image/*"
                value={banner}
                onChange={onBannerChange}
                required
              />
              <br />
              <input
                type="text"
                name="link"
                value={link}
                placeholder="배너 링크 입력"
                onChange={onBannerChange}
              />
              <br />
              <input
                type="text"
                name="text"
                value={explain}
                onChange={onBannerChange}
                placeholder="배너 설명 입력"
                required
              />
              <br />
              <button>등록</button>
            </form>
          </div>
        </div>
      ) : (
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={loginChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={pwd}
            onChange={loginChange}
          />
          <button>로그인</button>
        </form>
      )}
    </div>
  );
}
export default Admin;
