"use client";

import FormButton from "@/components/button";
import { useFormState } from "react-dom";
import { FormState, login } from "./actions";
import { FireIcon } from "@heroicons/react/24/solid";
import Input from "@/components/input";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const initialState: FormState = {
  errors: {},
  message: "",
};

export default function Home() {
  const [state, dispatch] = useFormState<FormState, FormData>(
    login,
    initialState
  );
  return (
    <div className="flex items-center justify-center w-full h-full flex-col min-h-screen gap-16  max-w-screen-sm m-auto">
      <span>
        <FireIcon className="size-20 text-red-400" />
      </span>
      <form action={dispatch} className="flex flex-col gap-4 w-full">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          errors={state?.errors?.fieldErrors?.email}
        />
        <Input
          type="text"
          name="username"
          placeholder="Username"
          required
          errors={state?.errors?.fieldErrors?.username}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          errors={state?.errors?.fieldErrors?.password}
        />
        <FormButton text="로그인" />
        {state.message && (
          <div className="flex p-4 rounded-3xl bg-green-400 gap-4">
            <CheckBadgeIcon className="size-6 ml-4" />
            <span className="font-semibold">{state.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
