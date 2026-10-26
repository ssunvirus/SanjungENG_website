import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["gurye-pool"];

export default function GuryeGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
