class Easing {
    constructor() {}
  
    /**
     *
     * all calculations on time to ease movement
     */
    static backInOut(t: number) {
      const s = 1.70158 * 1.525;
      if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
      return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }
  
    static backIn(t: number) {
      const s = 1.70158;
      return t * t * ((s + 1) * t - s);
    }
  
    static backOut(t: number) {
      const s = 1.70158;
      return --t * t * ((s + 1) * t + s) + 1;
    }
  
    static bounceInOut(t: number) {
      if (t < 0.5) return easing.bounceIn(t * 2) * 0.5;
      return easing.bounceOut(t * 2 - 1) * 0.5 + 0.5;
    }
  
    static bounceIn(t: number) {
      return 1 - easing.bounceOut(1 - t);
    }
  
    static bounceOut(t: number) {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    }
  
    static circInOut(t: number) {
      if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
      return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }
  
    static circIn(t: number) {
      return 1 - Math.sqrt(1 - t * t);
    }
  
    static circOut(t: number) {
      return Math.sqrt(1 - --t * t);
    }
  
    static cubicInOut(t: number) {
      if ((t *= 2) < 1) return 0.5 * t * t * t;
      return 0.5 * ((t -= 2) * t * t + 2);
    }
  
    static cubicIn(t: number) {
      return t * t * t;
    }
  
    static cubicOut(t: number) {
      return --t * t * t + 1;
    }
  
    static elasticInOut(t: number) {
      if ((t *= 2) < 1)
        return (
          0.5 * Math.sin(((13 * Math.PI) / 2) * t) * Math.pow(2, 10 * (t - 1))
        );
      return (
        0.5 *
        (Math.sin(((-13 * Math.PI) / 2) * (t - 1)) * Math.pow(2, -10 * (t - 1)) +
          2)
      );
    }
  
    static elasticIn(t: number) {
      return Math.sin(((13 * Math.PI) / 2) * t) * Math.pow(2, 10 * (t - 1));
    }
  
    static elasticOut(t: number) {
      return Math.sin(((-13 * Math.PI) / 2) * (t + 1)) * Math.pow(2, -10 * t) + 1;
    }
  
    static expoInOut(t: number) {
      if (t === 0) return 0;
      if (t === 1) return 1;
      if ((t *= 2) < 1) return 0.5 * Math.pow(1024, t - 1);
      return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    }
  
    static expoIn(t: number) {
      return t === 0 ? 0 : Math.pow(1024, t - 1);
    }
  
    static expoOut(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
  
    static quadInOut(t: number) {
      if ((t *= 2) < 1) return 0.5 * t * t;
      return -0.5 * (--t * (t - 2) - 1);
    }
  
    static quadIn(t: number) {
      return t * t;
    }
  
    static quadOut(t: number) {
      return -t * (t - 2);
    }
  
    static quartInOut(t: number) {
      if ((t *= 2) < 1) return 0.5 * t * t * t * t;
      return -0.5 * ((t -= 2) * t * t * t - 2);
    }
  
    static quartIn(t: number) {
      return t * t * t * t;
    }
  
    static quartOut(t: number) {
      return 1 - --t * t * t * t;
    }
  
    static quintInOut(t: number) {
      if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
      return 0.5 * ((t -= 2) * t * t * t * t + 2);
    }
  
    static quintIn(t: number) {
      return t * t * t * t * t;
    }
  
    static quintOut(t: number) {
      return --t * t * t * t * t + 1;
    }
  
    static sineInOut(t: number) {
      return -0.5 * (Math.cos(Math.PI * t) - 1);
    }
  
    static sineIn(t: number) {
      return 1 - Math.cos((t * Math.PI) / 2);
    }
  
    static sineOut(t: number) {
      return Math.sin((t * Math.PI) / 2);
    }
  
    static linear(t: number) {
      return t;
    }
  }
  