import type { ReactNode } from "react";
import styles from "./WaveSurface.module.css";

export default function WaveSurface({
  children,
  blendTop = false,
}: {
  children: ReactNode;
  blendTop?: boolean;
}) {
  return (
    <div className={styles.surface}>
      <div aria-hidden="true" className={styles.decoration}>
        <div className={`${styles.wave} ${styles.top} ${blendTop ? styles.blendTop : ""}`} />
        <div className={`${styles.wave} ${styles.bottom}`} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
