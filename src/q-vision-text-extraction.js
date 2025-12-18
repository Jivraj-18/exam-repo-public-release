import { html } from "./utils/html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "vision_text_extraction",
    title: "LLM Vision – Extract Text from Image",
    weight,

    question: html`
      <p>
        DocuScan Systems is building an automated pipeline to extract text from
        scanned documents using a vision-enabled LLM.
      </p>

      <p>
        You are given an image containing printed text (shown above).
        Your task is to construct the <strong>JSON body</strong> for a request
        that sends both a text instruction and the image to the OpenAI Chat
        Completions API.
      </p>

      <h3>Requirements</h3>
      <ul>
        <li>Use model <code>gpt-4o-mini</code></li>
        <li>Send exactly <strong>one user message</strong></li>
        <li>The message must contain:
          <ul>
            <li>A text instruction:
              <code>Extract all visible text from this image.</code>
            </li>
            <li>An image provided as a <strong>base64 image URL</strong></li>
          </ul>
        </li>
        <li>Text content must appear <strong>before</strong> the image content</li>
        <li>Do not include headers or API URL</li>
      </ul>

      <p>
        <strong>Write ONLY the JSON body</strong> that should be sent to the
        OpenAI Chat Completions API.
      </p>

      <p class="text-muted">
        There is no answer box visible initially.
        Figure out how to enable it — that is part of the test.
      </p>
    `,

    answer: {
      type: "json",
      validate: (value) =>
        value?.model === "gpt-4o-mini" &&
        Array.isArray(value?.messages) &&
        value.messages[0]?.role === "user" &&
        Array.isArray(value.messages[0]?.content),
    },
  };
}
