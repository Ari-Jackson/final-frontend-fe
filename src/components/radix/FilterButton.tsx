import { BsSliders } from "react-icons/bs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function FilterButton() {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="mt-3 flex items-center rounded-md border px-4 py-2 text-center font-medium text-gray-700 duration-150 hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm">
            <BsSliders className="mr-2" />
            Sort
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] ">
            <DropdownMenu.Group>
              <DropdownMenu.Label />
              <DropdownMenu.Item className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none sm:hover:cursor-pointer">
                Genre
              </DropdownMenu.Item>
              <DropdownMenu.Item className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1  group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none sm:hover:cursor-pointer">
                Pages
              </DropdownMenu.Item>
              <DropdownMenu.Item className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1  group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none sm:hover:cursor-pointer">
                Rating
              </DropdownMenu.Item>
              <DropdownMenu.Item className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1  group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none sm:hover:cursor-pointer">
                Tags
              </DropdownMenu.Item>
              <DropdownMenu.Item className="data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1  group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none sm:hover:cursor-pointer">
                Title
              </DropdownMenu.Item>
            </DropdownMenu.Group>

            <DropdownMenu.Separator />

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
