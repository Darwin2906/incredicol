export interface Plataforma {
  id: string;
  nombre: string;
  montoMin: number;
  montoMax: number;
  plazoMin: number;
  plazoMax: number;
  tasaInteres?: number;
  tasaInteresDiaria?: number; // ← NUEVA
  comision?: number;
  comisionFija?: number;       // ← NUEVA
  tiempoDesembolso: string;
  descuentos: string;
  destacado: boolean;
  rutaSimulador: string;
  faqUrl: string;
}
