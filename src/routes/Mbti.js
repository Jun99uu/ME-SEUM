import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const MBTIs = {
  INFP: [60, "저희… 꽤 잘맞을지도…?😚"],
  ENFP: [80, "완전 찰떡궁합!🤩"],
  INFJ: [40, "이정도면 짱친이지~🤗"],
  ENFJ: [60, "저희… 꽤 잘맞을지도…?😚"],
  INTJ: [20, "조금… 안맞아도 좋은 친구가 될 수 있다구요!🤪"],
  ENTJ: [20, "조금… 안맞아도 좋은 친구가 될 수 있다구요!🤪"],
  INTP: [100, "이게 사랑인가요…?😍"],
  ENTP: [80, "완전 찰떡궁합!🤩"],
  ISFP: [60, "저희… 꽤 잘맞을지도…?😚"],
  ESFP: [40, "이정도면 짱친이지~🤗"],
  ISTP: [100, "이게 사랑인가요…?😍"],
  ESTP: [60, "저희… 꽤 잘맞을지도…?😚"],
  ISFJ: [60, "저희… 꽤 잘맞을지도…?😚"],
  ESFJ: [60, "저희… 꽤 잘맞을지도…?😚"],
  ISTJ: [60, "저희… 꽤 잘맞을지도…?😚"],
  ESTJ: [40, "이정도면 짱친이지~🤗"],
};

function Mbti({ userName, userMbti }) {
  const [name, setName] = useState(userName);
  const [mbti, setMbti] = useState(userMbti);
  const [percent, setPercent] = useState(0);
  const [comment, setComment] = useState("");
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
    if (mbti !== "") {
      setPercent(MBTIs[mbti][0]);
      setComment(MBTIs[mbti][1]);
    }
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
          <h2>
            {percent}% : {comment}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Mbti;
