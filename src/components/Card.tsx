import React from "react";
import { useRouter } from "next/router";
import { Form } from "@/Types/Form";

const Card = ({ submission }: { submission: Form }) => {
  const router = useRouter();
  return (
    <div
      className="p-5 w-[360px] bg-white rounded-2xl cursor-pointer"
      onClick={() => router.push(`/submission/${submission.id}`)}
    >
      <div className="flex items-center">
        <img
          src={submission.file}
          alt="temp"
          className="w-[100px] h-[100px] object-cover rounded-lg mr-5"
        />
        <p className="text-xl font-semibold">{submission.title}</p>
      </div>
      <br />
      <p>{submission.summary}</p>
      <br />
      <p className="text-sm text-right italic text-[#666666]">
        uploaded 6 days ago
      </p>
    </div>
  );
};

export default Card;
