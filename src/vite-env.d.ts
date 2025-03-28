/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
    import * as React from 'react';
  
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  
    export {
      ReactComponent
    }
    
    const src: string;
    export default src;
  }
  