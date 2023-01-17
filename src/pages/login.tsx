import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

export const useIsAuthenticated = () => {
  const { status } = useSession();

  return useMemo(() => status === 'authenticated', [status]);
}

export default function Login() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header title="Login" description="This is the login page" />
      <main>
        {isAuthenticated ? (
          <>Redirecting to homepage</>
        ) : (
          <button onClick={() => signIn("google")}>Login</button>
        )}
      </main>
      <Footer
        title="Login Footer"
        description="Login Footer Description"
      ></Footer>
    </>
  );
}