import type { Editor as EditorType } from "@tiptap/react";

const handleBold = (editor: EditorType) => () =>
  editor.chain().focus().toggleBold().run();
const handleItalic = (editor: EditorType) => () =>
  editor.chain().focus().toggleItalic().run();
const handleQuote = (editor: EditorType) => () => {
  if (
    editor.isActive("bulletList") ||
    editor.isActive("orderedList") ||
    editor.isActive("taskList")
  ) {
    if (editor.isActive("bulletList")) {
      editor.chain().focus().toggleBulletList().run();
    }
    if (editor.isActive("orderedList")) {
      editor.chain().focus().toggleOrderedList().run();
    }
    if (editor.isActive("taskList")) {
      editor.chain().focus().toggleTaskList().run();
    }
  }
  editor.chain().focus().toggleBlockquote().run();
};
const handleLine = (editor: EditorType) => () =>
  editor.chain().focus().setHorizontalRule().run();

//Lists
const handleBullet = (editor: EditorType) => () =>
  editor.chain().focus().toggleBulletList().run();
const handleNumberList = (editor: EditorType) => () =>
  editor.chain().focus().toggleOrderedList().run();
const handleCheckList = (editor: EditorType) => () =>
  editor.chain().focus().toggleTaskList().run();

//Headings
const handleHeadingOne = (editor: EditorType) => () =>
  editor.chain().focus().toggleHeading({ level: 1 }).run();
const handleHeadingTwo = (editor: EditorType) => () =>
  editor.chain().focus().toggleHeading({ level: 2 }).run();

export {
  handleBold,
  handleItalic,
  handleQuote,
  handleLine,
  handleBullet,
  handleNumberList,
  handleCheckList,
  handleHeadingOne,
  handleHeadingTwo,
};
