import { useEffect, useState } from "react";

function Home({ userName, userMbti }) {
  const [name, setName] = useState(userName);
  const [mbti, setMbti] = useState(userMbti);

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
      {name} : {mbti}
    </div>
  );
}

export default Home;
