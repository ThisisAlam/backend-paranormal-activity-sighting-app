import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;

const DOMPurify = createDOMPurify(window);

export function sanitizeInput(text) {

    return DOMPurify.sanitize(text);

}