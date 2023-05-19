import { SyncLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <>
      <div className="mt-16 flex h-24 w-full items-center justify-center">
        <SyncLoader color="#f471b5" size={16} speedMultiplier={0.65} />
      </div>
    </>
  );
}
