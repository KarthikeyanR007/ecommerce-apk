import { IMAGE_URL } from "@/src/lib/api";

export const getImageUrl = (path?: string ) => {
  if (!path || typeof path !== "string" ) {
    return "https://www.realsimple.com/thmb/ye0mpYw0p9_AyP52rFCOfuB2nF4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-174655938-0dee21af9296498986e417a7639f335d.jpg";
  }
  return `${IMAGE_URL}/${path.replace(/^\/+/, "")}`;
};