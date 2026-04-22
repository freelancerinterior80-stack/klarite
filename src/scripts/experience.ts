let cleanup: (() => void) | undefined;

export async function setupExperience() {
  cleanup?.();

  if (typeof window === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements  = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const scaleElements   = Array.from(document.querySelectorAll<HTMLElement>("[data-scale-in]"));
  const dragContainers  = Array.from(document.querySelectorAll<HTMLElement>("[data-drag-scroll]"));

  if (prefersReducedMotion) {
    revealElements.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
    scaleElements.forEach((el)  => { el.style.opacity = "1"; el.style.transform = "none"; });
    cleanup = undefined;
    return;
  }

  const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
    import("lenis"),
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  // Prevent browser from restoring scroll position on refresh
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  const lenis = new Lenis({
    lerp: 0.1,           // exponential decay — smoother than fixed duration
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Single RAF driver — store reference so cleanup can remove it
  const lenisRaf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", () => ScrollTrigger.update());

  // ── Reveal animations ──────────────────────────────────────────
  revealElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: 1.4,
        ease: "power3.out",
        overwrite: "auto",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  });

  scaleElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.97, y: 14 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.5,
        ease: "power3.out",
        overwrite: "auto",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      }
    );
  });

  // ── Float tweens ───────────────────────────────────────────────
  const floatTweens: gsap.core.Tween[] = [];
  document.querySelectorAll<HTMLElement>("[data-float]").forEach((el, i) => {
    const distance = Number(el.dataset.floatDistance ?? 18) + i * 2;
    const duration = Number(el.dataset.floatDuration ?? 6.8) + i * 0.45;
    floatTweens.push(
      gsap.to(el, {
        y: -distance,
        x: i % 2 === 0 ? 1.5 : -1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration,
        overwrite: "auto",
      })
    );
  });

  // ── Parallax — scrub > 1 smooths the catch-up lag ─────────────
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const shift = Number(el.dataset.parallax ?? 14);
    gsap.fromTo(el,
      { yPercent: -shift },
      {
        yPercent: shift,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,       // lag behind scroll slightly — avoids stutter
        },
      }
    );
  });

  // ── Luxe card tilt ─────────────────────────────────────────────
  const hoverCleanups: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>("[data-luxe-card]").forEach((card) => {
    const media    = card.querySelector<HTMLElement>("[data-luxe-media]");
    const rotateXTo = gsap.quickTo(card,  "rotateX", { duration: 0.42, ease: "power3.out" });
    const rotateYTo = gsap.quickTo(card,  "rotateY", { duration: 0.42, ease: "power3.out" });
    const liftTo    = gsap.quickTo(card,  "y",       { duration: 0.42, ease: "power3.out" });
    const scaleTo   = media ? gsap.quickTo(media, "scale", { duration: 0.5, ease: "power3.out" }) : undefined;

    const onMove  = (e: PointerEvent) => {
      const r  = card.getBoundingClientRect();
      const rx = (e.clientX - r.left) / r.width;
      const ry = (e.clientY - r.top)  / r.height;
      rotateXTo((0.5 - ry) * 8);
      rotateYTo((rx - 0.5) * 10);
      liftTo(-8);
      scaleTo?.(1.02);
      card.style.setProperty("--pointer-x", `${rx * 100}%`);
      card.style.setProperty("--pointer-y", `${ry * 100}%`);
    };
    const onLeave = () => {
      rotateXTo(0); rotateYTo(0); liftTo(0); scaleTo?.(1);
      card.style.setProperty("--pointer-x", "50%");
      card.style.setProperty("--pointer-y", "22%");
    };

    card.addEventListener("pointermove",  onMove);
    card.addEventListener("pointerleave", onLeave);
    hoverCleanups.push(() => {
      card.removeEventListener("pointermove",  onMove);
      card.removeEventListener("pointerleave", onLeave);
    });
  });

  // ── Drag-scroll carousels ──────────────────────────────────────
  const dragCleanups: Array<() => void> = [];
  dragContainers.forEach((container) => {
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    const onDown  = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startLeft = container.scrollLeft;
      container.classList.add("is-dragging");
      container.setPointerCapture?.(e.pointerId);
    };
    const onMove  = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      gsap.to(container, {
        scrollLeft: startLeft - (e.clientX - startX) * 1.2,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onStop  = (e?: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove("is-dragging");
      if (e) container.releasePointerCapture?.(e.pointerId);
    };

    container.addEventListener("pointerdown",  onDown);
    container.addEventListener("pointermove",  onMove);
    container.addEventListener("pointerup",    onStop);
    container.addEventListener("pointerleave", onStop);
    container.addEventListener("pointercancel",onStop);

    dragCleanups.push(() => {
      container.removeEventListener("pointerdown",  onDown);
      container.removeEventListener("pointermove",  onMove);
      container.removeEventListener("pointerup",    onStop);
      container.removeEventListener("pointerleave", onStop);
      container.removeEventListener("pointercancel",onStop);
    });
  });

  // Ensure ScrollTrigger positions are correct after everything is set up
  ScrollTrigger.refresh();

  cleanup = () => {
    gsap.ticker.remove(lenisRaf);   // remove stored reference, not anonymous fn
    lenis.destroy();
    floatTweens.forEach((t) => t.kill());
    dragCleanups.forEach((fn) => fn());
    hoverCleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
