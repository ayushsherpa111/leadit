export function autoResize(element: HTMLTextAreaElement | null) {
  if (element) {
    const scrollHeight = element.scrollHeight;
    if (scrollHeight > element.clientHeight) {
      console.log("resizing");
      element.style.height = element.scrollHeight + "px";
    } else if (element.clientHeight > scrollHeight) {
      console.log("down sizing");
      element.style.height = scrollHeight + "px";
    }
  }
}
