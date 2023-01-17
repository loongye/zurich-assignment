import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Page {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  const data: User[] = [];

  const response = await fetch("/api/users");
  const firstPage = (await response.json()) as Page;
  const { total_pages } = firstPage;

  data.push(...firstPage.data);

  if (total_pages > 1) {
    const responses = await Promise.all(
      Array(total_pages - 1)
        .fill(0)
        .map((_, index) =>
          fetch(`/api/users?page=${index + 2}`)
        )
    );
    const pages = (await Promise.all(
      responses.map((res) => res.json())
    )) as Page[];

    pages.forEach((page) => {
      data.push(...page.data);
    });
  }

  return data;
});

const usersAdapter = createEntityAdapter<User>();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
