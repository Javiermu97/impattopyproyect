"use client";
export default function GoogleButton() {
  const signIn = () => {
    window.location.href = "/api/auth/google/start";
  };
  return <button onClick={signIn}>Ingresar con Google</button>;
}
