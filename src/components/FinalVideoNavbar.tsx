type Props = {
  downloadURL: string;
};

export function FinalVideoNavbar({ downloadURL }: Props) {
  return (
    <nav className="flex flex-col sm:flex-row items-center gap-8 justify-center p-4">
      <a
        target="_blank"
        className="text-center hover:no-underline relative z-10 overflow-hidden bg-blue-600 group hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center hover:shadow-2xl"
        download
        href={downloadURL}
      >
        <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
        Download
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
          <path d="M7 11l5 5l5 -5"></path>
          <path d="M12 4l0 12"></path>
        </svg>
      </a>
      <a
        target="_blank"
        className="text-center hover:no-underline relative z-10 overflow-hidden bg-[rgb(29,155,240)] group hover:brightness-105 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center hover:shadow-2xl"
        download
        href="https://twitter.com/intent/tweet?text=Check%20out%20the%20amazing%20video%20I%20created%20using%20Clippitt!%0A&url=https%3A%2F%2Fclippitt.app"
      >
        <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
        Tweet
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
            stroke-width="0"
            fill="currentColor"
          ></path>
        </svg>
      </a>
      <a
        target="_blank"
        className="text-center hover:no-underline relative z-10 overflow-hidden bg-slate-900 group hover:bg-slate-950 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out flex justify-center gap-2 items-center hover:shadow-2xl"
        download
        href="https://github.com/genaroibc/clippitt"
      >
        <span className="absolute -rotate-45 scale-150 -z-10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 top-0 left-0 right-0 h-2/4 bg-gradient-to-t from-white to-transparent opacity-50"></span>
        Star on GitHub
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"
            stroke-width="0"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </nav>
  );
}
