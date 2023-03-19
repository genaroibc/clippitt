import { LAYOUTS } from "@/constants/layouts";
import { Layout } from "@/types";
import Image from "next/image";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onNewLayout: (layout: Layout) => void;
};

export function ChooseLayouts({ onNewLayout }: Props) {
  return (
    <section>
      <h4 className="text-2xl mb-8 font-bold text-center">Choose a layout</h4>

      <div className="grid grid-cols-2 gap-8">
        {LAYOUTS.map((layout) => (
          <button
            className="bg-transparent p-0 hover:scale-105 hover:shadow-2xl transition-transform"
            key={layout.id}
            onClick={() => onNewLayout(layout.layout)}
          >
            <Image
              className="max-w-full rounded object-contain h-full"
              width={200}
              height={200}
              src={layout.url}
              alt="layout preview"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
