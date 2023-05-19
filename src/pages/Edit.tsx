import { useNavigate, useParams } from "react-router-dom";
import Form, { Inputs, Outputs } from "../components/Form";
import useSingleBook from "../hooks/queries/useSingleBook";
import useUpdateBook from "../hooks/mutations/useUpdateBook";
import { caseChanger } from "../utils/caseChanger";
import ServerDownPage from "./global/ServerDownPage";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookIsLoading, getBookHasError, book } = useSingleBook(id);

  const { mutate, updateIsError, updateIsSuccess, error } = useUpdateBook();

  const onSubmit = (updatedBookInfo: Inputs) => {
    const updatedBook = caseChanger(updatedBookInfo, "snakeCase");
    mutate({ id, updatedBook });
    return updatedBook;
  };

  if (getBookIsLoading) {
    return <LoadingSpinner />;
  }
  if (getBookHasError) {
    return <ServerDownPage />;
  }
  if (updateIsSuccess) {
    navigate(`/books/${id}`);
  }
  if (updateIsError) {
    console.log(error);
  }

  const transformedBook = caseChanger<Outputs>(book, "camelCase");
  return (
    <>
      <div className="mb-5 items-start justify-between border-b py-4 md:flex">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Edit</h3>
        </div>
      </div>
      <Form onSubmitFunc={onSubmit} values={transformedBook} />
    </>
  );
}
