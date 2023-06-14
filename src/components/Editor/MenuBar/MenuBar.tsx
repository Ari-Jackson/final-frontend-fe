import { FaBold, FaItalic, FaHeading } from "react-icons/fa";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import {
  VscListOrdered,
  VscListUnordered,
  VscChecklist,
  VscSave,
} from "react-icons/vsc";
import { ImQuotesLeft } from "react-icons/im";
import { RxDividerHorizontal } from "react-icons/rx";
import type { Editor as EditorType } from "@tiptap/react";
import { cn } from "../../../utils/cn";
import {
  handleBold,
  handleItalic,
  handleQuote,
  handleLine,
  handleBullet,
  handleNumberList,
  handleCheckList,
  handleHeadingOne,
  handleHeadingTwo,
} from "./MenuBarHandlers";

export default function MenuBar({
  editor,
  handleSave,
}: {
  editor: EditorType;
  handleSave: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-20 mb-2 flex w-full rounded-t-sm bg-pink-400 px-5 py-2 text-white",
          !editor.isEditable && "hidden"
        )}
      >
        <div className="mr-5 flex space-x-3 border-r pr-5">
          <button
            onClick={handleBold(editor)}
            className={cn(
              "h-fit rounded-md border p-2",
              editor.isActive("bold") && "bg-white text-pink-400"
            )}
          >
            <FaBold />
          </button>
          <button
            onClick={handleItalic(editor)}
            className={cn(
              "h-fit rounded-md border p-2",
              editor.isActive("italic") && "bg-white text-pink-400"
            )}
          >
            <FaItalic />
          </button>
        </div>
        <div className="mr-5 flex space-x-3 border-r pr-5">
          <button
            onClick={handleHeadingOne(editor)}
            className={cn(
              " flex h-fit items-end rounded-md border p-2",
              editor.isActive("heading", { level: 1 }) &&
                "bg-white text-pink-400"
            )}
          >
            <FaHeading /> <RiNumber1 className="h-3" />
          </button>
          <button
            onClick={handleHeadingTwo(editor)}
            className={cn(
              "flex h-fit items-end rounded-md border p-2",
              editor.isActive("heading", { level: 2 }) &&
                "bg-white text-pink-400"
            )}
          >
            <FaHeading />
            <RiNumber2 className="h-3" />
          </button>
        </div>
        <div className="mr-5 flex space-x-3 border-r pr-5">
          <button
            onClick={handleBullet(editor)}
            className={cn(
              "rounded-md border p-2",
              editor.isActive("bulletList") && "bg-white text-pink-400"
            )}
          >
            <VscListUnordered />
          </button>
          <button
            onClick={handleNumberList(editor)}
            className={cn(
              "rounded-md border p-2",
              editor.isActive("orderedList") && "bg-white text-pink-400"
            )}
          >
            <VscListOrdered />
          </button>
          <button
            onClick={handleCheckList(editor)}
            className={cn(
              "rounded-md border p-2",
              editor.isActive("taskList") && "bg-white text-pink-400"
            )}
          >
            <VscChecklist />
          </button>
        </div>
        <div className="mr-5 flex space-x-3 pr-5">
          <button
            onClick={handleLine(editor)}
            className={"rounded-md border p-2"}
          >
            <RxDividerHorizontal />
          </button>
          <button
            onClick={handleQuote(editor)}
            className="rounded-md border p-2"
          >
            <ImQuotesLeft />
          </button>
        </div>
        <div className="flex flex-grow items-center justify-end space-x-3 ">
          <p>{editor.storage.characterCount.words()} words </p>
          <button
            onClick={handleSave}
            className="rounded-md border px-4 py-2 duration-200 hover:bg-white hover:text-pink-400"
          >
            <VscSave />
          </button>
        </div>
      </div>
    </>
  );
}
