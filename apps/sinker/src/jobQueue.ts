import { Queue } from "bullmq";

const videosQ = new Queue("videos");

interface AddImmediateProps {
  url: string;
}

export function addImmediate(payload: AddImmediateProps) {
  videosQ.add("download", payload, { lifo: true });
}
