import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import Card from "@/components/Card";
import useStore from "@/store";
import { Form } from "@/Types/Form";

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function Home() {
  const [tab, setTab] = useState("All");
  const [searchText, setSearchText] = useState("");
  const hasHydrated = useHasHydrated();
  const [sort, setSort] = useState("Newest");
  const activeCSS = "border-b-4 border-[#44924C] text-[#333333]";
  const [open, setOpen] = useState(false);

  const {
    fetchAllSubmissions,
    allSubmissions,
  }: { fetchAllSubmissions: any; allSubmissions: any } = useStore();

  const [submissions, setSubmissions] = useState<Form[]>(allSubmissions);

  useEffect(() => {
    fetchAllSubmissions();
  }, [fetchAllSubmissions]);

  useEffect(() => {
    setSubmissions(allSubmissions);
  }, [allSubmissions]);

  useEffect(() => {
    if (searchText) {
      const filteredSubmissions = allSubmissions.filter((submission: Form) => {
        return submission.title
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setSubmissions(filteredSubmissions);
    } else {
      setSubmissions(allSubmissions);
    }
  }, [searchText, allSubmissions]);

  return (
    <>
      <Hero />
      <main className="mx-[150px] py-[25px]">
        <div className="flex justify-between">
          <div className="flex gap-8">
            <span
              className={`${
                tab === "All" && activeCSS
              } cursor-pointer text-[#666666] px-6 text-center text-lg`}
              onClick={() => setTab("All")}
            >
              All Submissions
            </span>
            <span
              className={`${
                tab !== "All" && activeCSS
              } cursor-pointer text-[#666666] px-6 text-center text-lg`}
              onClick={() => setTab("Favourite")}
            >
              Favourite Submissions
            </span>
          </div>
          <div className="flex gap-8">
            <div className="relative">
              <AiOutlineSearch className="absolute top-2 left-5 text-2xl text-[#666666]" />
              <input
                type="text"
                className="w-[250px] focus:outline-none border-2 border-[#666666] rounded-full py-2 pl-[50px] pr-5 text-sm placeholder:text-[#666666] placeholder:text-sm placeholder:font-semibold"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder="Search"
              />
            </div>
            <div className="relative">
              <div
                className="border-2 border-[#666666] rounded-full py-2 text-sm w-[125px] flex items-center justify-evenly cursor-pointer gap-[15px]"
                onClick={() => setOpen((prev) => !prev)}
              >
                {sort}
                <IoMdArrowDropdown className="text-2xl mt-1" />
              </div>
              {open && (
                <div className="absolute top-[100%] left-0 w-[125px] bg-white rounded-lg mt-[5px]">
                  <span
                    className={`block py-2 px-6 text-sm cursor-pointer hover:bg-[#E3F2E5] rounded-t-lg ${
                      sort === "Newest" ? "bg-[#E3F2E5]" : ""
                    }`}
                    onClick={() => {
                      setSort("Newest");
                      setOpen(false);
                    }}
                  >
                    Newest
                  </span>
                  <span
                    className={`block py-2 px-6 text-sm cursor-pointer hover:bg-[#E3F2E5] rounded-b-lg ${
                      sort !== "Newest" ? "bg-[#E3F2E5]" : ""
                    }`}
                    onClick={() => {
                      setSort("Oldest");
                      setOpen(false);
                    }}
                  >
                    Oldest
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {hasHydrated && allSubmissions && allSubmissions.length > 0 && (
          <div className="grid grid-cols-3 gap-10 mt-10">
            {tab === "All"
              ? sort !== "Newest"
                ? submissions.map((submission: Form) => (
                    <Card key={submission.id} submission={submission} />
                  ))
                : submissions
                    .slice(0)
                    .reverse()
                    .map((submission: Form) => (
                      <Card key={submission.id} submission={submission} />
                    ))
              : sort !== "Newest"
              ? submissions.map((submission: Form) => {
                  if (!submission.isFavourite) return false;
                  return <Card key={submission.id} submission={submission} />;
                })
              : submissions
                  .slice(0)
                  .reverse()
                  .map((submission: Form) => {
                    if (!submission.isFavourite) return false;
                    return <Card key={submission.id} submission={submission} />;
                  })}
          </div>
        )}
      </main>
    </>
  );
}
