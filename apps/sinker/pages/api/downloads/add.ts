import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiDownloadAddRequestOptions {}

export interface ApiDownloadAddRequest {
  url: string;
  options: ApiDownloadAddRequestOptions;
}

export interface ApiDownloadAddResponse {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDownloadAddResponse>,
) {
  res.status(200).json({ name: "John Doe" });
}
