import heroShowroomImg from './images/showroom_classic_boutique_1794509767733.jpg';
import heroCraftsmanshipImg from './images/hero_hardware_craftsmanship_1794507289220.jpg';
import heroFlutedDoorImg from './images/hero_luxury_architectural_brass_1794507289824.jpg';
import heroWallDisplayImg from './images/hero_architectural_hardware_1794506587523.jpg';
import prodDoorHandlesImg from './images/product_luxury_door_handles_1794506588522.jpg';
import prodPrecisionLocksImg from './images/product_precision_locks_security_1794506589633.jpg';
import prodCabinetFittingsImg from './images/product_cabinet_drawer_fittings_1794506589408.jpg';
import prodSmartLockImg from './images/product_smart_biometric_lock_1794509769284.jpg';
import prodBathroomSuiteImg from './images/product_brass_bathroom_suite_1794509770493.jpg';
import prodBallHingesImg from './images/product_ball_bearing_hinges_1794509771241.jpg';
import prodDrawerSlideImg from './images/product_telescopic_drawer_slide_1794509772356.jpg';

export const IMAGES = {
  showroomBoutique: heroShowroomImg,
  craftsmanshipKnurled: heroCraftsmanshipImg,
  flutedWalnutDoor: heroFlutedDoorImg,
  architecturalWall: heroWallDisplayImg,
  doorHandlesMarble: prodDoorHandlesImg,
  precisionMortiseLock: prodPrecisionLocksImg,
  cabinetPullsKitchen: prodCabinetFittingsImg,
  smartBiometricLock: prodSmartLockImg,
  brassBathroomSuite: prodBathroomSuiteImg,
  ballBearingHinges: prodBallHingesImg,
  telescopicDrawerSlide: prodDrawerSlideImg,
} as const;

export const LEGACY_IMAGE_MAP: Record<string, string> = {
  '/src/assets/images/showroom_classic_boutique_1794509767733.jpg': heroShowroomImg,
  '/src/assets/images/showroom_interior_store_1794506590256.jpg': heroShowroomImg,
  '/src/assets/images/hero_hardware_craftsmanship_1794507289220.jpg': heroCraftsmanshipImg,
  '/src/assets/images/hero_luxury_architectural_brass_1794507289824.jpg': heroFlutedDoorImg,
  '/src/assets/images/hero_architectural_hardware_1794506587523.jpg': heroWallDisplayImg,
  '/src/assets/images/product_luxury_door_handles_1794506588522.jpg': prodDoorHandlesImg,
  '/src/assets/images/product_precision_locks_security_1794506589633.jpg': prodPrecisionLocksImg,
  '/src/assets/images/product_cabinet_drawer_fittings_1794506589408.jpg': prodCabinetFittingsImg,
  '/src/assets/images/product_smart_biometric_lock_1794509769284.jpg': prodSmartLockImg,
  '/src/assets/images/product_brass_bathroom_suite_1794509770493.jpg': prodBathroomSuiteImg,
  '/src/assets/images/product_ball_bearing_hinges_1794509771241.jpg': prodBallHingesImg,
  '/src/assets/images/product_telescopic_drawer_slide_1794509772356.jpg': prodDrawerSlideImg,
};

export function resolveImageSrc(src: string | undefined, fallback: string = heroShowroomImg): string {
  if (!src) return fallback;
  if (LEGACY_IMAGE_MAP[src]) return LEGACY_IMAGE_MAP[src];
  return src;
}
