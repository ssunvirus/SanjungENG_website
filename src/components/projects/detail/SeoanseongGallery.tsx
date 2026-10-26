import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["seoanseong-maintenance"];

export default function SeoanseongGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
