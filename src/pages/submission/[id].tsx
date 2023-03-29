import React, { useState } from "react";
import { useRouter } from "next/router";
import useStore from "@/store";
import { Form } from "@/Types/Form";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { BsGithub, BsCalendar } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import moment from "moment";

const Submission = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    allSubmissions,
    updateSubmission,
    deleteSubmission,
  }: {
    allSubmissions: Form[];
    updateSubmission: (submission: Form) => void;
    deleteSubmission: (id: string | string[]) => void;
  } = useStore();
  const [toDelete, setToDelete] = useState(false);
  const submission = allSubmissions.find((s) => s.id === id);
  if (!submission || !id) return false;
  return (
    <>
      <div className="h-[400px] bg-[#003145] flex space-between pl-[100px] pr-[200px] py-[80px] gap-[150px]">
        <div>
          <div className="flex items-center gap-[30px]">
            <img
              src={submission.file}
              alt="logo"
              className="w-[100px] h-[100px] object-cover rounded-lg mr-5"
            />
            <h1 className="text-4xl text-white font-semibold">
              {submission.title}
            </h1>
          </div>
          <br />
          <div className="text-md text-white">{submission.summary}</div>
          <br />
          <div className="flex items-center gap-[20px]">
            <div className="border-r-[1px] border-[#CCCCCC] pr-[20px] text-2xl text-white">
              {submission.isFavourite ? (
                <AiFillStar
                  onClick={() =>
                    updateSubmission({ ...submission, isFavourite: false })
                  }
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlineStar
                  onClick={() =>
                    updateSubmission({ ...submission, isFavourite: true })
                  }
                  className="cursor-pointer"
                />
              )}
            </div>
            <span className="bg-[#255973] flex jusitfy-center items-center gap-[12px] rounded-xl px-5 py-2 text-lg text-white">
              <BsCalendar className="text-lg text-[#F5F5F5]" />
              {moment(submission.createdAt).format("DD MMMM")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] items-end w-[50%] ">
          <button
            className="w-[150px] border-[1px] border-white rounded-lg text-white py-2 px-5 flex items-center gap-[10px] justify-center"
            onClick={() => router.push(`/edit/${submission.id}`)}
          >
            <MdModeEdit className="text-xl" /> Edit
          </button>
          <button
            className="w-[150px] border-[1px] border-white rounded-lg text-white py-2 px-5 flex items-center gap-[10px] justify-center"
            onClick={() => setToDelete(true)}
          >
            <IoMdTrash className="text-xl" />
            Delete
          </button>
        </div>
      </div>
      <main className="my-[50px] px-[90px] flex gap-[100px]">
        <div className="w-[75%]">
          <div className="text-lg">Description</div>
          <br />
          <div className="whitespace-pre-line">{submission.description}</div>
        </div>
        <div className="w-[25%]">
          <div className="text-[#858585] text-lg">Hackathon</div>
          <br />
          <div className="w-fit text-lg font-bold">{submission.name}</div>
          <br />
          <div className="flex justify-evenly items-center gap-[10px] text-sm text-[#858585] font-semibold w-fit">
            <BsCalendar /> {moment(submission.startDate).format("DD MMMM YYYY")}{" "}
            - {moment(submission.endDate).format("DD MMMM YYYY")}
          </div>
          <br />
          <a href={submission.github} target="_blank">
            <button className="w-[85%] border-[1px] py-2 rounded-xl border-[#666666] text-[#666666] flex items-center gap-[5px] justify-center font-semibold">
              <BsGithub className="text-2xl" /> GitHub Repository
            </button>
          </a>
          <br />
          {submission.links && (
            <a href={submission.links} target="_blank">
              <button className="w-[85%] border-[1px] py-2 rounded-xl border-[#666666] text-[#666666] flex items-center gap-[5px] justify-center font-semibold">
                <HiOutlineExternalLink className="text-2xl" /> Other Link
              </button>
            </a>
          )}
        </div>
      </main>
      {toDelete && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-[#000000] bg-opacity-50 flex items-center justify-center"
          onClick={() => setToDelete(false)}
        >
          <div className="w-[450px] h-[200px] bg-white rounded-2xl px-10 pt-7">
            <div className="text-xl font-bold mb-3">Delete model</div>
            <div>
              This action is irreversible. Are you sure you want to delete this
              model?
            </div>
            <br />
            <div className="flex gap-[20px] justify-end">
              <button
                className="border-2 border-black py-2 px-5 rounded-xl"
                onClick={() => setToDelete(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-5 rounded-xl bg-[#DF2C1D] text-white shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2)] shadow-[0_2px_2px_0_rgba(0,0,0,0.14)] shadow-[0_1px_5px_0_rgba(0,0,0,0.12)]"
                onClick={() => {
                  deleteSubmission(id);
                  router.push("/");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Submission;
