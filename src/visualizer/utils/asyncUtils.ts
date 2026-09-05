export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper auxiliar genérico para transiciones (el que definiste)
// export function esperarTransicion(elemento: HTMLElement | null): Promise<void> {
//   return new Promise((resolve) => {
//     if (!elemento) return resolve();

//     const handler = (e: TransitionEvent) => {
//       if (e.target !== elemento) return;
//       elemento.removeEventListener("transitionend", handler);
//       resolve();
//     };

//     elemento.addEventListener("transitionend", handler);
//   });
// }


export function esperarTransicion(
  elemento: HTMLElement | null, 
  timeoutMaximo: number = 800
): Promise<void> {
  return new Promise((resolve) => {
    // Si el elemento es nulo o no existe, resolvemos de inmediato
    if (!elemento) {
      resolve();
      return;
    }

    let resuelto = false;

    const limpiarYContinuar = () => {
      if (!resuelto) {
        resuelto = true;
        elemento.removeEventListener("transitionend", limpiarYContinuar);
        clearTimeout(timerSeguridad);
        resolve();
      }
    };

    // Escucha el evento normal de la transición
    elemento.addEventListener("transitionend", limpiarYContinuar, { once: true });

    // RESPALDO: Si transcurre 'timeoutMaximo' ms sin evento CSS, se fuerza la resolución
    const timerSeguridad = setTimeout(() => {
      limpiarYContinuar();
    }, timeoutMaximo);
  });
}