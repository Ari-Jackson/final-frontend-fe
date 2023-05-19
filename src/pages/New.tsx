import { useNavigate } from "react-router-dom";
import Form, { Inputs } from "../components/Form";
import { caseChanger } from "../helper";
import useCreateBook from "../hooks/mutations/useCreateBook";

export default function New() {
  const { mutate, isSuccess, isError, error } = useCreateBook();
  const navigator = useNavigate();
  const onSubmit = (updatedBookInfo: Inputs) => {
    const updatedBook = caseChanger(updatedBookInfo, "snakeCase");
    mutate(updatedBook);
    return updatedBook;
  };

  if (isSuccess) {
    navigator(`/books/`);
  }
  if (isError) {
    console.log(error);
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
