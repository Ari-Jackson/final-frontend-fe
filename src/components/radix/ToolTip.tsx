import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface AppProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: AppProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <div>{children}</div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className="inline-flex items-center rounded-md bg-pink-200 px-4 py-2.5"
        >
          <TooltipPrimitive.Arrow className="fill-pink-200 dark:text-gray-800" />
          <span className="block text-sm leading-none text-gray-900">
            {text}
          </span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
