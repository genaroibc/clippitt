import { LAYOUTS } from "@/constants/layouts";
import { Layout } from "@/types";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onNewLayout: (layout: Layout) => void;
};

export function ChooseLayouts({ onNewLayout }: Props) {
  return (
    <section>
      <div className="grid grid-cols-2 gap-8">
        {LAYOUTS.map((layout) => (
          <button
            className="bg-transparent p-0 hover:scale-105 hover:shadow-2xl transition-transform"
            key={layout.id}
            onClick={() => onNewLayout(layout.layout)}
          >
            <img
              className="max-w-full rounded object-cover h-full"
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
