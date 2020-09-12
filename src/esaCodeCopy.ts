const styleRuleInsertLog: WeakMap<Document, boolean> = new WeakMap();
const cssPrefix = `k777`;
export class EsaCodeCopy {
  constructor(private readonly element: HTMLDivElement) {
    const fileName = element.querySelector<HTMLElement>(".code-filename").innerText;
    const insertElement = document.createElement("div");
    insertElement.classList.add(cssPrefix);
    insertElement.classList.add("code-block__copy-button");
    for (let v of getButtons(fileName)) {
      insertElement.appendChild(v.button);
    }
    element.querySelector(".highlight").appendChild(insertElement);
    EsaCodeCopy.insertStyleRule();
  }
  private static insertStyleRule() {
    if (styleRuleInsertLog.has(document)) {
      return;
    }
    styleRuleInsertLog.set(document, true);
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    styleEl.sheet.insertRule(`.markdown .code-block__copy-button.${cssPrefix}{ position: absolute;top: -25px;right: 0;border:0;}`);
    styleEl.sheet.insertRule(`.markdown .code-block__copy-button.${cssPrefix} button{ font-family: monospace; font-size: 13px;line-height: 13px; }`);
    // デフォルトのコードハイライトの高さを変える
    styleEl.sheet.insertRule(`pre.highlight {line-height:12px;font-size:12px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace; }`);
  }
}
function copyText(str: string) {
  navigator.clipboard.writeText(str);
}
type ButtonType = { button: HTMLButtonElement, type: ("all" | "path") };
function getButtons(filePath: string): ButtonType[] {
  const result: ButtonType[] = [];
  const splitPath = [...filePath.split(/[\\\/]/)];
  if (1 < splitPath.length) {
    const element = document.createElement("button");
    element.innerText = filePath;
    element.addEventListener("click", () => {
      copyText(filePath);
    });
    result.push({
      button: element,
      type: "all"
    });
  }
  for (let path of splitPath) {
    const element = document.createElement("button");
    element.innerText = path;
    element.addEventListener("click", () => {
      copyText(path);
    });
    result.push({
      button: element,
      type: "path"
    });
  }
  return result;
}
