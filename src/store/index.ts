import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Form } from "@/Types/Form";

const dataStore = (set: any, get: any) => ({
  allSubmissions: [],
  addSubmission: (submission: Form) => {
    const data = localStorage.getItem("Submissions");
    const parsedData = data ? JSON.parse(data)?.state?.allSubmissions : [];
    parsedData.push(submission);
    localStorage.setItem("Submissions", JSON.stringify(parsedData));
    set({ allSubmissions: parsedData });
  },
  fetchAllSubmissions: () => {
    const data = localStorage.getItem("Submissions");
    if (!data) return;
    const parsedData = JSON.parse(data)?.state?.allSubmissions;
    set({ allSubmissions: parsedData });
  },
  updateSubmission: (submission: Form) => {
    const allSubmissions = get().allSubmissions;
    const filtered = allSubmissions.map((sub: Form) => {
      if (sub.id === submission.id) {
        return submission;
      } else {
        return sub;
      }
    });
    localStorage.setItem("Submissions", JSON.stringify(filtered));
    set({ allSubmissions: filtered });
    console.log(filtered);
  },
  deleteSubmission: (id: string | string[]) => {
    const allSubmissions = get().allSubmissions;
    const filtered = allSubmissions.filter(
      (submission: Form) => submission.id !== id
    );
    localStorage.setItem("Submissions", JSON.stringify(filtered));
    set({ allSubmissions: filtered });
  },
});

const useStore = create(persist(dataStore, { name: "Submissions" }));

export default useStore;
