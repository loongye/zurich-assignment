import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  fetchAllUsers,
  useAppDispatch,
  useAppSelector,
  usersSelectors,
} from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useIsAuthenticated } from "./login";

const Content = () => {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) =>
    usersSelectors
      .selectAll(state)
      .filter(
        (i) => i.first_name.startsWith("G") || i.last_name.startsWith("W")
      )
  );

  useEffect(() => {
    if (isAuthenticated)
      dispatch(fetchAllUsers());
  }, [isAuthenticated]);

  return <main>
    <table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((i) => (
          <tr key={i.id}>
            <td>
              <img src={i.avatar} />
            </td>
            <td>{i.first_name}</td>
            <td>{i.last_name}</td>
            <td>{i.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
}

export default function Home() {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header title="Home" description="This is the homepage" />
      {!isAuthenticated ? <p>Unauthorized, redirecting to login page...</p> : <Content />}
      <Footer
        title="This is the footer title"
        description="This is the footer description"
      />
    </>
  );
}
