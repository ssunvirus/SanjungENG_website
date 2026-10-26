import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["orion-production"];

export default function OrionGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
