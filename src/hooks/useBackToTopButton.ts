import { type RefObject, useEffect, useState } from 'react';

export function useBackToTopButton(containerRef: RefObject<HTMLDivElement>) {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollTop > 0) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    const div = containerRef.current;
    div?.addEventListener('scroll', scrollHandler);
    return () => {
      div?.removeEventListener('scroll', scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToTopHandler = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { showBtn, backToTopHandler };
}
