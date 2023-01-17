import { ReactElement, useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import PasswordInput from "../src/components/PasswordInput";
import { signIn, getCsrfToken, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Loader from "../src/components/Loader";

type Form = {
  name: string;
  password: string;
  csrfToken: string;
};

type LoginProps = {
  csrfToken: string;
};

const classes = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
  },
} as any;

const Login = ({ csrfToken }: LoginProps): ReactElement => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    name: "",
    password: "",
    csrfToken,
  });
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session === null) {
      setIsLoading(false);
    }
    if (session) router.push("/home");
  }, [session, router]);

  const handleChangeForm = (value: string, item: "name" | "password") => {
    setForm({ ...form, [item]: value });
  };

  const handleSubmit = (): void => {
    setIsLoading(true);
    signIn("credentials", form);
  };

  if (loading) return <Loader />;
  return (
    <div style={classes.root}>
      <div style={classes.form}>
        <TextField
          label="Nom"
          variant="outlined"
          onChange={(e) => handleChangeForm(e.target.value, "name")}
        />
        <PasswordInput
          onChange={(value) => handleChangeForm(value, "password")}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Connexion
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
