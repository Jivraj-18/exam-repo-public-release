import { html } from "./utils/display.js";

export default function ({ user, weight = 1 }) {
  const id = "q-docker-multi-stage";
  
  return {
    id,
    weight,
    question: html`
      <h3>Docker Multi-Stage Build Optimization</h3>
      <p>You are deploying a Python FastAPI application. Which Dockerfile uses multi-stage builds correctly to minimize the final image size?</p>
    `,
    type: "multiple-choice",
    options: [
      {
        value: "a",
        label: html`
          <pre>FROM python:3.11
RUN pip install fastapi uvicorn
COPY . /app
WORKDIR /app
CMD ["uvicorn", "main:app"]</pre>
        `,
      },
      {
        value: "b",
        label: html`
          <pre>FROM python:3.11 as builder
WORKDIR /build
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
COPY --from=builder /root/.local /root/.local
COPY . /app
WORKDIR /app
ENV PATH=/root/.local/bin:$PATH
CMD ["uvicorn", "main:app"]</pre>
        `,
      },
      {
        value: "c",
        label: html`
          <pre>FROM python:3.11-alpine
RUN apk add gcc
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["python", "-m", "uvicorn", "main:app"]</pre>
        `,
      },
      {
        value: "d",
        label: html`
          <pre>FROM ubuntu:22.04
RUN apt-get update && apt-get install python3-pip
COPY . /app
WORKDIR /app
RUN pip3 install fastapi uvicorn
CMD ["uvicorn", "main:app"]</pre>
        `,
      },
    ],
    answer: "b",
  };
}
