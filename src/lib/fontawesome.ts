import { config, library } from "@fortawesome/fontawesome-svg-core";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faLaptopCode,
  faDrawPolygon,
  faEdit,
  faBullhorn,
  faMapMarkerAlt,
  faPhone,
  faPaperPlane,
  faComment,
  faComments,
  faChartLine,
  faChalkboardTeacher,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";

// Tell Font Awesome to skip adding the CSS automatically since we're using Astro
config.autoAddCss = false;

// Add all icons to the library so they're available
library.add(
  fab,
  faLaptopCode,
  faDrawPolygon,
  faEdit,
  faBullhorn,
  faMapMarkerAlt,
  faPhone,
  faPaperPlane,
  faComment,
  faComments,
  faChartLine,
  faChalkboardTeacher,
  faSchool
);

// Icon name mapping from kebab-case to icon definitions
export const iconMap: Record<string, IconDefinition> = {
  "laptop-code": faLaptopCode,
  "draw-polygon": faDrawPolygon,
  edit: faEdit,
  bullhorn: faBullhorn,
  "map-marker-alt": faMapMarkerAlt,
  phone: faPhone,
  "paper-plane": faPaperPlane,
  comment: faComment,
  comments: faComments,
  "chart-line": faChartLine,
  "chalkboard-teacher": faChalkboardTeacher,
  school: faSchool,
};
