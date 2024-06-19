import { download_string_as_file } from "@/lib/download";

function page_template(image_name: string, content: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${image_name}</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      html, body {
        width: 100%;
        height: 100%;
      }

      .wrapper {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    ${content}
  </body>
</html>`;
}

export function process_html_node(node: HTMLElement, image: string) {
  if (!(node instanceof HTMLImageElement)) node.classList.value = 'container';

  const img =
    node instanceof HTMLImageElement ? node : node.querySelector("img");
  if (!img) throw new Error("Image node not found");
  img.src = image;
  img.srcset = "";
  img.classList.value = "";

  const bg = node.querySelector("div");
  if (bg) bg.classList.value = "bg_container";

  const style = document.createElement("style");
  style.textContent = `
      .bg_container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
      }
      
      .container {
        position: relative;
        margin: auto; /* position at middle */

        overflow: hidden;
      }`;

  node.prepend(style);

  const div = document.createElement("div");
  div.classList.add("wrapper");
  div.appendChild(style);
  div.appendChild(node);

  return div;
}

export function export_page_html(
  node: HTMLElement,
  image: string,
  image_name?: string
) {
  const processed_node = process_html_node(node, image);
  return page_template(
    image_name ?? "Exported Image",
    processed_node.outerHTML
  );
}

export function download_processed_image(
  node: HTMLElement,
  image: string,
  image_name?: string
) {
  download_string_as_file(
    export_page_html(node, image, image_name),
    `${image_name ?? "image"}.html`,
    "text/html"
  );
}
