"use server"

import VideoCardClient from "./VideoCardClient";
import { getVideoCardComponents } from "../serverActions"

export default async function VideoCardPage() {
  // Server Action to retrieve VideoCard parts
  const VideoCardComponents = await getVideoCardComponents();
  return <VideoCardClient initialData={VideoCardComponents} />;
}