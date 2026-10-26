import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["church-cooling-tower"];

export default function CoolingTowerGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
