import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Lottie from "react-lottie";
import animationData from "../../src/lottie/natural-landing-page.json";
import logo from "../../public/CapstoneLogo.png";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { user } = router.query;

  const [windowH, setWindowH] = useState(null);
  const [windowW, setWindowW] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(user);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const updateDimensions = () => {
    setWindowW(window.innerWidth);
    setWindowH(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      passcode: password,
    }),
  };

  const login = () => {
    alert(`Login with \n Username : ${username} \n Password : ${password}`);
    fetch(`http://localhost:3600/${user}/login`, requestOptions)
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (user === "students") {
          router.push(`/dashboard/students/${data}`);
        } else {
          router.push(`/dashboard/admins/${data}`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="login" content="Login to Capstone" />
      </Head>

      <Lottie options={defaultOptions} height={windowH} width={windowW} />
      <div className={styles.landing}>
        <Image
          width={400}
          height={400}
          alt="logo"
          src={logo}
          onClick={() => router.push("/")}
        />

        <div className={styles.loginForm}>
          <form className={styles.form} autoComplete="off">
            <input
              type="text"
              name="username"
              placeholder="username"
              autoComplete="false"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              autoComplete="false"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>

        <div className={styles.btns}>
          <h5>No account ? Register</h5>
          <button
            className={styles.btn}
            onClick={login}
            disabled={username == "" ? true : password == "" ? true : false}
          >
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
