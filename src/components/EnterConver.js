import moving from "../img/moving.gif";
import shy from "../img/shy.png";
import wink from "../img/wink.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EnterConver({ setUserName, setUserMbti }) {
  const firstComment = "어서오세요,\nKyu-SEUM에 오신 것을 환영합니다😆";
  const secondComment = "이곳은 @99uu_u님의 미술관입니다.";
  const thirdComment =
    "입장 전, 실례가 안된다면 몇가지 질문을 드려도 괜찮을까요?";
  const fourthComment = "혹시 성함이 어떻게 되시나요?";
  const [fifthComment, setFifth] = useState(
    "그렇군요.. 아무개씨 반갑습니다.\n그렇다면 혹시 MBTI가 어떻게 되시는지요..?"
  );
  const finalComment = "알겠습니다.\n이제 입장하시겠습니다.";
  const [sixthComment, setSix] = useState("오호,, ISTJ이시군요😎");
  const commentList = [
    firstComment,
    secondComment,
    thirdComment,
    fourthComment,
    fifthComment,
    sixthComment,
    finalComment,
  ];

  const navigate = useNavigate();
  const [helper, setHelper] = useState(0);
  const [comment, setComment] = useState(commentList[0]);
  const [yesorno, setYes] = useState(true);
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState("");
  const mbtis = [
    "",
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];
  const like = ["ISFP", "ISTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"];

  const onClick = () => {
    if (helper < 6) {
      if (helper === 3) {
        if (name === "") {
          return null;
        }
      }
      if (helper === 4) {
        if (mbti === "") {
          return null;
        }
      }
      if (yesorno === true) {
        setHelper((prevState) => (prevState < 6 ? prevState + 1 : prevState));
      } else {
        setHelper(6);
      }
    } else {
      navigate(`/home`);
    }
  };

  useEffect(() => {
    setComment(commentList[helper]);
  }, [helper]);

  const tagHandler = (radio) => {
    setYes(radio);
  };

  const nameChange = (e) => {
    setName(e.target.value);
    setUserName(e.target.value);
  };

  useEffect(() => {
    setFifth(
      `그렇군요.. ${name}씨 반갑습니다.\n그렇다면 혹시 MBTI가 어떻게 되시는지요..?`
    );
  }, [name]);

  const mbtiChange = (e) => {
    setMbti(e.target.value);
    setUserMbti(e.target.value);
  };

  useEffect(() => {
    if (like.includes(mbti)) {
      setSix(`오호,, ${mbti}이시군요😎 (우리 좀 잘맞을지도ㅎ)`);
    } else {
      setSix(`오호,, ${mbti}이시군요😎`);
    }
  }, [mbti]);

  const submitBlock = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <img src={helper === 5 ? wink : moving} alt="집사" />
      <div>
        {comment}

        {helper === 2 ? (
          <form onSubmit={submitBlock}>
            <input
              type="radio"
              id="yes"
              checked={yesorno === true}
              onClick={() => tagHandler(true)}
              readOnly
            />
            <label htmlFor="yes">네</label>
            <input
              type="radio"
              id="no"
              checked={yesorno === false}
              onClick={() => tagHandler(false)}
              readOnly
            />
            <label htmlFor="no">아니오</label>
          </form>
        ) : null}
        {helper === 3 ? (
          <form onSubmit={submitBlock}>
            <input
              type="text"
              placeholder="이름을 작성해주세요."
              value={name}
              onChange={nameChange}
              required
            />
          </form>
        ) : null}
        {helper === 4 ? (
          <select onChange={mbtiChange} value={mbti}>
            {mbtis.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        ) : null}
        <button onClick={onClick}>다음으로</button>
      </div>
    </div>
  );
}

export default EnterConver;
