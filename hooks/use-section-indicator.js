import { useState, useEffect } from 'react';

function useSectionIndicator(sectionRef, pageRef) {
  const [onTarget, setOnTarget] = useState(false);

  function handleScroll() {
    // const sectionRef = document.getElementById(sectionId);
    const rect = sectionRef.current.getBoundingClientRect();
    const location = rect.top + rect.height / 2;
    setOnTarget(location <= window.innerHeight / 2);
  }

  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 1000);
    pageRef.current.addEventListener('scroll', handleScroll);
    return () => {
      pageRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(`onTarget: ${onTarget}`);
  }, [onTarget]);

  return onTarget;
}

export default useSectionIndicator;
