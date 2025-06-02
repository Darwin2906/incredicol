export interface Plataforma {
  id: string;
  nombre: string;
  montoMin: number;
  montoMax: number;
  plazoMin: number;
  plazoMax: number;
  tasaInteres: number;
  comision: number;

  // Nuevas propiedades opcionales (usa `?` si no todas las plataformas las tienen)
  tiempoDesembolso?: string;
  descuentos?: string;
  destacado?: boolean;
  rutaSimulador?: string;
  faqUrl?: string;
}
