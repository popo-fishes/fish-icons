/*
 * @Date: 2024-07-28 16:57:34
 * @Description: Modify here please
 */
import React, { useMemo } from "react";
import classNames from "classnames";
import { IconProps } from "./type";

const Icon: React.FC<IconProps> = (props) => {
  const { className, children, style, onClick } = props;
  const iconStyle = useMemo(() => {
    const _style = {
      display: "inline-flex",
      alignItems: "center",
      fontStyle: "normal"
    };

    if (props.size) {
      _style[`fontSize`] = typeof props.size == "string" ? props.size : `${props.size}px`;
    }
    if (props.color) {
      _style[`color`] = props.color;
    }
    return _style;
  }, [props?.size, props?.color]);

  return (
    <span style={{ ...iconStyle, ...style }} onClick={onClick} className={classNames("fish-icon", className)} role="img">
      {children}
    </span>
  );
};

export default Icon;
