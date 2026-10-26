import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["aju-pharmaceutical"];

export default function AjuGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
