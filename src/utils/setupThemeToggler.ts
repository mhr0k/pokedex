import setTheme from "./setTheme";

export default function setupButtonToggler(): void {
  const toggler = document.querySelector("#themeToggler") as HTMLButtonElement;
  toggler.addEventListener("click", (e) => {
    setTheme("toggle");
  });
}
