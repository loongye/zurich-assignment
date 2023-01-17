// https://next-auth.js.org/configuration/nextjs#in-api-routes

import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

const url = 'https://reqres.in/api/users'

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const searchParams = new URLSearchParams(req.url.split('?')[1]);
  const page = searchParams.get('page');

  if (page) {
    return res.json(await (await fetch(`${url}?page=${page}`)).json())
  }

  return res.json(await (await fetch(url)).json())
}