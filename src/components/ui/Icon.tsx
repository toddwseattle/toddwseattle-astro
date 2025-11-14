import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../lib/fontawesome";

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
