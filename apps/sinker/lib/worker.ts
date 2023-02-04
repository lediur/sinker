import { Worker } from "bullmq";
import {
  QUEUE_VIDEO,
  VideoQueueJobNames,
  VideoQueuePayload,
  VideoQueueResponse,
} from "@/lib/jobQueue";
import YTDlpWrap from "yt-dlp-wrap";
import { config } from "@/lib/config";

const ytdlp = new YTDlpWrap();

const worker = new Worker<
  VideoQueuePayload,
  VideoQueueResponse,
  VideoQueueJobNames
>(QUEUE_VIDEO, (job) => {
  switch (job.name) {
    case "download": {
      const { url } = job.data;
      const controller = new AbortController();

      ytdlp
        .exec(
          [
            url,
            // provide config via command line options only
            "--no-config-locations",
            // only download video if link contains both video and playlist
            "--no-playlist",
            // only allow ascii in filenames (shouldn't be an issue with our download format)
            "--restrict-filenames",
            "-o",
            "%(id)s.%(ext)s",
            // download to imports path
            "-P",
            config.videoDownloadDir,
            // write all the metadata
            "--write-description",
            "--write-info-json",
            "--write-comments",
            "--write-thumbnail",
            "--write-subs",
          ],
          undefined,
          controller.signal,
        )
        .on("progress", (progress) => job.updateProgress(progress))
        .on("ytDlpEvent", (eventType, eventData) =>
          console.log(eventType, eventData),
        )
        .on("error", (error) => {
          throw error;
        })
        .on("close", () => {});
    }
    default: {
      throw new Error(`unsupported job name '${job.name}'`);
    }
  }
});

worker.on("error", (err) => {
  console.error(err);
});
