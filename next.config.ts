import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    forceSwcTransforms: true, // Forzar el uso de SWC incluso con configuración de Babel personalizada
  }
};

export default nextConfig;
