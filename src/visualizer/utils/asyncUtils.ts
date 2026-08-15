export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper auxiliar genérico para transiciones (el que definiste)
export function esperarTransicion(elemento: HTMLElement | null): Promise<void> {
  return new Promise((resolve) => {
    if (!elemento) return resolve();

    const handler = (e: TransitionEvent) => {
      if (e.target !== elemento) return;
      elemento.removeEventListener("transitionend", handler);
      resolve();
    };

    elemento.addEventListener("transitionend", handler);
  });
}


