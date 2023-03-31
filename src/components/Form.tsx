import React, { useState, useRef, useEffect } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";
import Image from "next/image";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import { Form } from "@/Types/Form";
import moment from "moment";

const Form = ({
  submission,
  onSubmit,
  buttonName,
}: {
  submission?: Form;
  onSubmit: (submission: Form) => void;
  buttonName: string;
}) => {
  const [form, setForm] = useState<Form>(
    submission || {
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
      startDate: null,
      endDate: null,
    }
  );

  const [error, setError] = useState("");

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

  const handleChange = async (e: any) => {
    setError("");
    if (e.target.name === "file") {
      const base64 = await getBase64(e.target.files[0]);
      setForm({
        ...form,
        [e.target.name]: base64,
        fileName: e.target.files[0].name,
      });
    } else if (e.target.name === "description") {
      if (e.target.value.length > 3000) return;
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const router = useRouter();

  const validForm = () => {
    if (
      !form.title ||
      !form.summary ||
      !form.description ||
      !form.file ||
      !form.name ||
      !form.github ||
      !form.links ||
      !form.startDate ||
      !form.endDate
    ) {
      setError("Please fill out all of the fields");
      return false;
    } else if (moment(form.endDate).isBefore(form.startDate)) {
      setError("Start date cannot be after end date");
      return false;
    }
    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onSubmit(form);
    if (!validForm()) return;
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

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-[200px] mt-[100px] bg-white p-[50px] rounded-3xl">
      <form className="flex gap-[50px] flex-col" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold">New Hackathon Session</h1>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="title" className="text-lg">
            Title<sup>*</sup>
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
            Summary<sup>*</sup>
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
            Description<sup>*</sup>
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
            Cover Image<sup>*</sup>
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
            Hackathon Name<sup>*</sup>
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
              Hackathon Start Date<sup>*</sup>
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
              defaultValue={
                form.startDate
                  ? moment(form.startDate).format("YYYY-MM-DD")
                  : null
              }
            />
          </div>

          <div className="flex flex-col gap-[15px] w-[50%]">
            <label htmlFor="endDate" className="text-lg">
              Hackathon End Date<sup>*</sup>
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
              defaultValue={
                form.endDate ? moment(form.endDate).format("YYYY-MM-DD") : null
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="github">
            GitHub Repository<sup>*</sup>
          </label>
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
          <label htmlFor="links">
            Other Links<sup>*</sup>
          </label>
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
        <div className="flex gap-[15px] items-center justify-between">
          <button
            type="submit"
            className="bg-[#44924C] py-2 px-5 rounded-lg text-white "
          >
            {buttonName} Submission
          </button>
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </form>
    </div>
  );
};

export default Form;
