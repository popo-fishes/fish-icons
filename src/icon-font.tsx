/*
 * @Date: 2024-01-13 17:18:17
 * @Description: Modify here please
 */
import React from "react";
import Icon from "./icon";
import { IconProps } from "./icon/type";

const customCache = new Set<string>();

function isValidCustomScriptUrl(scriptUrl: string): boolean {
  return typeof scriptUrl === "string" && scriptUrl.length && !customCache.has(scriptUrl);
}

function createScriptUrlElements(scriptUrls: string[], index: number = 0): void {
  const currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    const script = document.createElement("script");
    script.setAttribute("src", currentScriptUrl);
    script.setAttribute("data-namespace", currentScriptUrl);
    if (scriptUrls.length > index + 1) {
      script.onload = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
      script.onerror = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }
    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}

export interface IconFontProps extends IconProps {
  type: string;
}

export default function create(
  options: {
    scriptUrl?: string | string[];
  } = {}
): React.FC<IconFontProps> {
  const { scriptUrl } = options;

  /**
   *需要DOM API。
   *确保在浏览器环境中。
   *自定义图标将创建一个＜script/＞
   *它加载SVG符号并将SVG元素插入到文档正文中。
   */
  if (typeof document !== "undefined" && typeof window !== "undefined" && typeof document.createElement === "function") {
    if (Array.isArray(scriptUrl)) {
      // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      createScriptUrlElements(scriptUrl.reverse());
    } else {
      createScriptUrlElements([scriptUrl]);
    }
  }

  const Iconfont: React.FC<IconFontProps> = (props) => {
    const { type, children, ...restProps } = props;

    // children > type
    let content: React.ReactNode = null;
    if (props.type) {
      content = (
        <svg {...{ width: "1em", height: "1em", fill: "currentColor" }}>
          <use xlinkHref={`#${type}`} />
        </svg>
      );
    }
    if (children) {
      content = children;
    }
    return <Icon {...restProps}>{content}</Icon>;
  };
  return Iconfont;
}
