import { useEffect, useRef } from 'react';

/**
 * useUpdateEffect - 在依赖更新时触发，跳过首次渲染。
 */
export function useUpdateEffect(effect: () => void, deps: any[]) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    effect();
  }, deps);
}
