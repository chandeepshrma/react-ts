import { HiHome } from "react-icons/hi";

export default function Brand() {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 font-[Arial,Helvetica,sans-serif]">
      <span
        className="grid size-9 -rotate-4 place-items-center rounded-md bg-[#292e30] text-white"
        aria-hidden="true"
      >
        <HiHome className="size-6" />
      </span>
      <span className="text-lg leading-none font-bold tracking-normal">Architects</span>
    </span>
  );
}
