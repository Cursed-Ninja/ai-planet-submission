import React from "react";
import useStore from "@/store";
import { useRouter } from "next/router";
import { Form } from "@/Types/Form";
import FormComponent from "@/components/Form";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { updateSubmission, allSubmissions } = useStore();
  const submission = allSubmissions.find((s: Form) => s.id === id);

  if (!id || !submission) return false;

  return (
    <FormComponent
      buttonName="Save"
      submission={submission}
      onSubmit={updateSubmission}
    />
  );
};

export default Edit;
