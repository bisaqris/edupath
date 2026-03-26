import { InputGroupProps } from "@/types";
import clsx from "clsx";

export default function InputGroup({ label, value, type = "text", isWhite = false }: InputGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className={clsx(
          "w-full border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all text-navy",
          isWhite ? "bg-white" : "bg-slate-50"
        )}
      />
    </div>
  );
}