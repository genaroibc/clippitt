interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RotatingGradientButton({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${className} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 text-white font-bold duration-300 ease-in-out rotate-gradient hover:no-underline hover:shadow-2xl min-w-fit flex gap-2 items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-transform relative z-10 overflow-hidden group`}
    >
      <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
      {children}
    </button>
  );
}
