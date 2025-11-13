import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

// Add icons to library
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

export type IconProps = IconProp;

interface IconComponentProps {
  icon: IconProp;
  className?: string;
  size?:
    | "xs"
    | "sm"
    | "lg"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
}

const Icon: React.FC<IconComponentProps> = ({ icon, className, size }) => (
  <FontAwesomeIcon icon={icon} className={className} size={size} />
);

export default Icon;
