import Head from "next/head";
import { useForm, Controller, get } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <div className="container mx-auto p-4 max-w-md">Main page</div>
    </>
  );
}
