'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    await authClient.signUp.email({
      email,
      password,
      name,
    },
      {
        onError: (ctx: any) => {
          alert(ctx.error.message);
        },
        onSuccess: (ctx: any) => {
          alert("User created successfully");
        },
        onRequest: (ctx: any) => {
          //show loading
        },
      }
    )
  }

  const onLogin = () => {
    authClient.signIn.email({
      email, password
    },
      {
        onError: (ctx: any) => {
          alert(ctx.error.message);
        },
        onSuccess: (ctx: any) => {
          alert("User login successfully");
        },
        onRequest: (ctx: any) => {
          //show loading
        },
      })
  }
  const { data: session } = authClient.useSession();

  if (session?.user) {
    return (
      <div>
        Logged in as {session.user.name}
        <Button onClick={() => authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              alert("Signed out successfully");
            }
          }
        })}>
          Sign Out
        </Button>
      </div>
    )
  }
  return (
    <div className="text-4xl font-bold flex flex-col justify-between items-center gap-4">
      <div>
        <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>
      <div>
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
