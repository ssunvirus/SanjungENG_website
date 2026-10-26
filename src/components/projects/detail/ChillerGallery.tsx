import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["semiconductor-chiller"];

export default function ChillerGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
