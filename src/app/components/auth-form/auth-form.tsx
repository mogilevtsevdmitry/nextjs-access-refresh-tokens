"use client";
import apiClient from "@/app/api/api";
import { useState } from "react";

interface IAuthForm {
  email: string;
  password: string;
}

const initialState = {
  email: "",
  password: "",
};

export default function AuthForm() {
  const [form, setForm] = useState<IAuthForm>(initialState);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const setEmail = (e: any) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const setPassword = (e: any) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));
  };

  const login = async () => {
    try {
      const response = await apiClient.post<{ accessToken: string }>(
        "/auth/login/email",
        form,
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setToken(response.data.accessToken);
      setForm(initialState);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const refresh = async () => {
    try {
      const response = await apiClient.post<{ accessToken: string }>(
        "/auth/refresh-tokens"
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setRefreshToken(response.data.accessToken);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="grid max-w-md">
      <form>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            value={form.email}
            onChange={setEmail}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
            onChange={setPassword}
          />
        </div>
        <button
          type="button"
          className="mt-2 mx-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={login}
        >
          Login
        </button>
        <button
          type="button"
          className="mt-2 mx-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={refresh}
        >
          Refresh
        </button>
      </form>
      <div
        className="block mt-3 text-gray-900 dark:text-white"
        style={{ width: "500px", wordWrap: "break-word", padding: "1rem" }}
      >
        <h2 className="text-green-500">Login</h2>
        <p>{token}</p>
      </div>
      <div
        className="block mt-3 text-gray-900 dark:text-white"
        style={{ width: "500px", wordWrap: "break-word", padding: "1rem" }}
      >
        <h2 className="text-green-500">Refresh Token</h2>
        <p>{refreshToken}</p>
      </div>
    </div>
  );
}
