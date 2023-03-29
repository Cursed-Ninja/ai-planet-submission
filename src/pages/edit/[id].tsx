import React, { useState, useRef, useEffect } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";
import Image from "next/image";
import useStore from "@/store";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import { Form } from "@/Types/Form";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { updateSubmission, allSubmissions } = useStore();
  const ref = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Form>(
    allSubmissions.find((s: Form) => s.id === id) || {
      id: uuid(),
      title: "",
      summary: "",
      description: "",
      name: "",
      github: "",
      links: "",
      file: "",
      fileName: "",
      isFavourite: false,
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    }
  );

  if (!id || !allSubmissions.find((s: Form) => s.id === id)) return false;

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const parseDate = (s: any) => {
    const b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  };

  const handleChange = (e: any) => {
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: getBase64(e.target.files[0]),
        fileName: e.target.files[0].name,
      });
    } else if (e.target.name === "description") {
      if (e.target.value.length > 3000) return;
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    updateSubmission(form);
    setForm({
      id: uuid(),
      title: "",
      summary: "",
      description: "",
      name: "",
      github: "",
      links: "",
      file: "",
      fileName: "",
      isFavourite: false,
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    });
    router.push("/");
  };

  return (
    <div className="mx-[200px] mt-[100px] bg-white p-[50px] rounded-3xl">
      <form className="flex gap-[50px] flex-col" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold">New Hackathon Session</h1>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="title" className="text-lg">
            Title
          </label>
          <input
            type="text"
            className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
            placeholder="Title of your submission"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="summary" className="text-lg">
            Summary
          </label>
          <input
            type="text"
            className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
            placeholder="A short summary of your submission (this will be visible with your submission)"
            name="summary"
            id="summary"
            value={form.summary}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none resize-none"
            name="description"
            id="description"
            rows={6}
            placeholder="Write a long description of your project. You can describe your idea and approach here."
            onChange={handleChange}
            value={form.description}
          />
          <span className="text-right text-[#858585]">
            {form.description.length} / 3,000 characters
          </span>
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="file" className="text-lg">
            Cover Image
          </label>
          <span className="text-[#858585]">
            Minimum resolution: 360px X 360px
          </span>
          <div
            className={`w-full ${
              !form.file
                ? "border-dashed border-4 border-[#CCCCCC] justify-center"
                : "justify-between"
            } bg-[#F5F5F5] rounded-3xl h-[100px] cursor-pointer flex items-center py-4 px-[50px]`}
            onClick={() => ref.current?.click()}
          >
            {!form.file ? (
              <RiImageAddFill className="text-[#CCCCCC] text-5xl" />
            ) : (
              <>
                <div className="flex items-center gap-[20px]">
                  <Image
                    src={form.file}
                    alt="cover"
                    width={1}
                    height={1}
                    className="w-[50px] h-[50px] object-cover rounded-lg"
                  />
                  <span>{form.fileName}</span>
                </div>
                <div className="flex items-center gap-[20px]">
                  <span className="text-[#858585] font-semibold text-lg">
                    Reupload
                  </span>
                  <IoMdCloudUpload className="text-[#858585] text-3xl" />
                </div>
              </>
            )}
            <input
              ref={ref}
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="name" className="text-lg">
            Hackathon Name
          </label>
          <input
            type="text"
            className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
            placeholder="Enter the name of the hackathon"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-[100px]">
          <div className="flex flex-col gap-[15px] w-[50%]">
            <label htmlFor="startDate" className="text-lg">
              Hackathon Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
              onChange={(e: any) =>
                setForm({
                  ...form,
                  startDate: parseDate(e.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col gap-[15px] w-[50%]">
            <label htmlFor="endDate" className="text-lg">
              Hackathon End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
              onChange={(e: any) =>
                setForm({
                  ...form,
                  endDate: parseDate(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="github">GitHub Repository</label>
          <input
            type="text"
            className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
            placeholder="Enter your submission’s public GitHub repository link"
            name="github"
            id="github"
            value={form.github}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="links">Other Links</label>
          <input
            type="text"
            className="border-[1px] border-[#858585] rounded-lg w-full text-md py-2 px-5 focus:outline-none"
            placeholder="You can upload a video demo or URL of you demo app here."
            name="links"
            id="links"
            value={form.links}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-[15px] items-start">
          <button
            type="submit"
            className="bg-[#44924C] py-2 px-5 rounded-lg text-white "
          >
            Save Submission
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
