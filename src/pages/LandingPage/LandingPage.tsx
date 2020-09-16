import React, { useRef, useEffect } from 'react';
import { ReactComponent as LandingSvg } from '../../assets/LandingSvg.svg';
import { makeStyles } from '@material-ui/core';
import gsap from 'gsap';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    height: 400,
  },
}));

const LandingPage: React.FC = () => {
  const classes = useStyles();
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const [element] = svgRef.current!.children;

    const hand = element.querySelector('#hand');
    const panel1 = element.querySelector('#panel1');
    const panel2 = element.querySelector('#panel2');

    const tl = gsap.timeline();
    tl.set([panel1, panel2], { autoAlpha: 0, zIndex: 1 });
    tl.fromTo(
      panel1,
      { y: '-=50' },
      { y: '+=50', autoAlpha: 1, duration: 1, ease: 'power3.inOut' },
    )
      .fromTo(
        panel2,
        { x: '+=50' },
        { x: '-=50', autoAlpha: 1, duration: 1, ease: 'power3.inOut' },
      )
      .to(hand, {
        rotateZ: 10,
        yoyoEase: true,
        repeat: 3,
        duration: 0.7,
        transformOrigin: '-30% 100%',
      });
  }, []);

  return (
    <div className={classes.container}>
      <div ref={svgRef}>
        <LandingSvg className={classes.svg} />
      </div>
    </div>
  );
};

export default LandingPage;
