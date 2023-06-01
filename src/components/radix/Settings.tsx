import { HiOutlineDotsVertical } from "react-icons/hi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

export default function Settings({
  id,
  handleDelete,
  // setEditorIsActive,
  editorIsActive,
}: {
  id: string | undefined;
  handleDelete: () => void;
  setEditorIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  editorIsActive?: boolean;
}) {
  // const handleToggleEditor = () => setEditorIsActive((data) => !data);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="rounded-m mt-3 flex items-center py-2 text-center font-medium text-gray-700 duration-150 hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm">
            <HiOutlineDotsVertical />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="min-w-20 rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] ">
            <DropdownMenu.Group>
              <DropdownMenu.Label />
              <DropdownMenu.Item className="text-6 group relative my-1 flex h-6 select-none items-center rounded-sm px-5 leading-none outline-none data-[highlighted]:bg-pink-400 data-[highlighted]:text-white sm:hover:cursor-pointer">
                <Link to={`/books/${id}/edit`}>Edit Book</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                disabled
                className="group relative my-1 flex h-6 select-none items-center rounded-sm px-5 leading-none outline-none data-[disabled]:cursor-not-allowed data-[hover]:cursor-pointer data-[highlighted]:bg-pink-400 data-[disabled]:text-gray-200 data-[highlighted]:text-white"
              >
                <div>{!editorIsActive ? "Edit Review" : "Close Editor"}</div>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DeleteButton handleDelete={handleDelete}>
                <DropdownMenu.Item
                  onSelect={(event) => event.preventDefault()}
                  className="text-6 group relative my-1 flex h-6 select-none items-center rounded-sm px-5 leading-none outline-none data-[highlighted]:bg-pink-400 data-[highlighted]:text-white sm:hover:cursor-pointer"
                >
                  <div>Delete</div>
                </DropdownMenu.Item>
              </DeleteButton>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
