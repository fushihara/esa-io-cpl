import { EsaCodeCopy } from "./esaCodeCopy";

main();
function main() {
  const elements = document.querySelectorAll<HTMLDivElement>(".markdown > div.code-block");
  for (let e of elements) {
    new EsaCodeCopy(e);
  }
}