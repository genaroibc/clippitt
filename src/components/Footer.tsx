import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-t-2 py-6 md:px-12 text-center w-full md:max-w-fit mx-auto">
      <p>
        Developed with ❤️ by{" "}
        <span className="text-violet-400">Genaro Bonavita</span> in
        2023
      </p>
      <p>
        <a href="https://gena.dev">gena.dev</a> - <a href="https://github.com/genaroibc/clippitt" className="inline-flex items-center gap-2 justify-center">
          visit on github <IconBrandGithub />
        </a>
      </p>
    </footer>
  );
}
