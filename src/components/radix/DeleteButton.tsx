import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface AppProps {
  children: React.ReactNode;
  handleDelete: () => void;
}

const DeleteButton = ({ children, handleDelete }: AppProps) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-gray-400 opacity-50" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="m-0 mb-3 text-center text-lg font-medium text-gray-900">
          Are you sure? This action cannot be undone
        </AlertDialog.Title>
        <div className="flex justify-center gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="inline-block flex-1 rounded-lg bg-gray-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-gray-400 sm:flex-none md:text-base">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={handleDelete}
              className="inline-block flex-1 rounded-lg bg-red-400 px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-red-600 sm:flex-none md:text-base"
            >
              Yes, delete this book
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteButton;
