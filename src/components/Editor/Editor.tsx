import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import MenuBar from "./MenuBar/MenuBar";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUpdateReview from "../../hooks/mutations/useUpdateReview";

type EditorProps = {
  review: string;
};

export default function Editor({ review }: EditorProps) {
  const [editorIsActive, setEditorIsActive] = useState(false);
  const { id } = useParams();
  const { mutate, updateIsSuccess } = useUpdateReview();
  const Header = Document.extend({
    content: "heading block*",
  });

  const editor = useEditor({
    editable: editorIsActive,
    extensions: [
      Header,
      StarterKit.configure({
        history: false,
        heading: false,
        document: false,
        horizontalRule: {
          HTMLAttributes: {
            class: "border mx-auto my-2 border-pink-200",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside block ml-10",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside block ml-10",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "ml-5 pl-5 border-l-2 text-xl border-pink-200",
          },
        },
      }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level: 1 | 2 = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes = {
            1: "text-4xl",
            2: "text-2xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex space-x-5",
        },
      }),
      TaskList,
      CharacterCount,
    ],
    content: review,
    editorProps: {
      attributes: {
        class: "focus:outline-none p-4 w-full h-full rounded-b-md max-h-full",
      },
    },
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }
    editor.setEditable(editorIsActive);
  }, [editor, editorIsActive]);

  useEffect(() => {
    if (updateIsSuccess) {
      setEditorIsActive(false);
    }
  }, [updateIsSuccess]);

  if (!editor) {
    return null;
  }

  const handleSave = () => {
    const html = editor.getHTML();
    mutate({ id, review: html });
  };

  return (
    <>
      <div onClick={() => setEditorIsActive(true)}>
        {!!editorIsActive && (
          <MenuBar editor={editor} handleSave={handleSave} />
        )}
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
