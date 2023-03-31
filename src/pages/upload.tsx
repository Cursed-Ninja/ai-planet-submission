import React from "react";
import useStore from "@/store";
import FormComponent from "@/components/Form";

const Upload = () => {
  const { addSubmission } = useStore();

  return <FormComponent buttonName="Upload" onSubmit={addSubmission} />;
};

export default Upload;
