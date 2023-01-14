import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <>
      <Header title="Login" description="This is the login page" />
      <main>
        {session ? (
          <>Redirecting to homepage</>
        ) : (
          <button onClick={() => signIn()}>Login</button>
        )}
      </main>
      <Footer
        title="Login Footer"
        description="Login Footer Description"
      ></Footer>
    </>
  );
}
