import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const MBTIs = {
  INFP: 60,
  ENFP: 80,
  INFJ: 40,
  ENFJ: 60,
  INTJ: 20,
  ENTJ: 20,
  INTP: 100,
  ENTP: 80,
  ISFP: 60,
  ESFP: 40,
  ISTP: 100,
  ESTP: 60,
  ISFJ: 60,
  ESFJ: 60,
  ISTJ: 60,
  ESTJ: 40,
};

function Mbti({ userName, userMbti }) {
  const [name, setName] = useState(userName);
  const [mbti, setMbti] = useState(userMbti);
  const [percent, setPercent] = useState(0);
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

  useEffect(() => {
    setPercent(MBTIs[mbti]);
  }, [mbti]);

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
          <ProgressBar width={60} color={"#EFEFEF"}>
            <ProgressBar width={percent} color={"#FFC300"} moving={1} inner />
          </ProgressBar>
        </div>
      )}
    </div>
  );
}

export default Mbti;
