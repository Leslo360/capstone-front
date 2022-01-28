import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Dash = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3600/students/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((_data) => {
        setUser(_data.result[0]);
      });
  }, [uid]);

  return (
    <div>
      <h1>Username : {user?.username}</h1>
      <h1>Enrolment Status : {user?.enrolmentStatus}</h1>
    </div>
  );
};

export default Dash;
