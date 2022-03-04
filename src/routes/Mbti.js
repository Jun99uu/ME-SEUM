import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MBTIs = {
  INFP : 0,
  ENFP : 0,
  INFJ : 0,
  ENFJ : 0,
  INTJ : 0,
  ENTJ : 0,
  INTP : 0,
  ENTP : 0,
  ISFP : 0,
  ESFP : 0,
  ISTP : 0,
  ESTP : 0,
  ISFJ : 0,
  ESFJ : 0,
  ISTJ : 0,
  ESTJ : 0
}

function Mbti({ userName, userMbti }) {
  const [name, setName] = useState(userName);
  const [mbti, setMbti] = useState(userMbti);
  const navigate = useNavigate();

  useEffect(() => {
    if (name === "" && mbti === "") {
      setName(sessionStorage.getItem("name"));
      setMbti(sessionStorage.getItem("mbti"));
    } else {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("mbti", mbti);
    }
  }, []);


  return (
    <div>
      {name === "" || mbti === "" || !name || !mbti ? (
        <div>
          <h2>정보 입력을 안하셨네요😢</h2>
          <h3>우리 얼마나 잘 맞는 사이인지 궁금하지 않아요?🤗</h3>
          <button onClick={() => navigate("/")}>입력하러 가기</button>
        </div>
      ) : (
        <div>
          <h2>{name}님과 저희 미술관은…</h2>
          <div className="progress"></div>
        </div>
      )}
    </div>
  );
}

export default Mbti;
