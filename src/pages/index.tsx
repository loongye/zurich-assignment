import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  fetchAllUsers,
  useAppDispatch,
  useAppSelector,
  usersSelectors,
} from "@/store";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) =>
    usersSelectors
      .selectAll(state)
      .filter(
        (i) => i.first_name.startsWith("G") || i.last_name.startsWith("W")
      )
  );
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  if (!session) return <p>Unauthorized, redirecting to login page...</p>;

  return (
    <>
      <Header title="Home" description="This is the homepage" />
      <main>
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
      <Footer
        title="This is the footer title"
        description="This is the footer description"
      />
    </>
  );
}
