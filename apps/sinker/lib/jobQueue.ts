import { Queue, Worker } from "bullmq";

export const QUEUE_VIDEO = "videos";

export type VideoQueuePayload = AddImmediateProps;

export type VideoQueueResponse = never;

export type VideoQueueJobNames = "download";

const videosQ = new Queue<
  VideoQueuePayload,
  VideoQueueResponse,
  VideoQueueJobNames
>(QUEUE_VIDEO);

interface AddImmediateProps {
  url: string;
}

export function addImmediate(payload: AddImmediateProps) {
  videosQ.add("download", payload, { lifo: true });
}
