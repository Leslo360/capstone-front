import { useRouter } from "next/router";

const Dash = () => {
  const router = useRouter();
  const { uid } = router.query;

  return <p>User: {uid}</p>;
};

export default Dash;
