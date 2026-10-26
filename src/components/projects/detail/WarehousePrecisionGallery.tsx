import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = legacyProjectPhotos["warehouse-precision-ac"];

export default function WarehousePrecisionGallery() {
  return <ProjectPhotoGallery photos={photos} />;
}
