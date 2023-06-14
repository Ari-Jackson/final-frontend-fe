import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { Inputs } from "../utils/types";
import { caseChanger } from "../utils/caseChanger";
import useCreateBook from "../hooks/mutations/useCreateBook";

export default function New() {
  const { mutate, createIsSuccess } = useCreateBook();
  const navigator = useNavigate();
  const onSubmit = (updatedBookInfo: Inputs) => {
    const updatedBook = caseChanger(updatedBookInfo, "snakeCase");
    mutate(updatedBook);
  };

  if (createIsSuccess) {
    navigator(`/books`);
  }

  return (
    <>
      <div className="mb-5 items-start justify-between border-b py-4 md:flex">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">New</h3>
        </div>
      </div>
      <Form onSubmitFunc={onSubmit} />
    </>
  );
}
