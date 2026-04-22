let cleanup: (() => void) | undefined;

export async function setupExperience() {
  cleanup?.();

  if (typeof window === "undefined") {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const scaleElements = Array.from(document.querySelectorAll<HTMLElement>("[data-scale-in]"));
  const dragContainers = Array.from(document.querySelectorAll<HTMLElement>("[data-drag-scroll]"));

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    scaleElements.forEach((element) => {
      element.style.transform = "none";
      element.style.opacity = "1";
    });
    cleanup = undefined;
    return;
  }

  const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
    import("lenis"),
    import("gsap"),
    import("gsap/ScrollTrigger")
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.0,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Use GSAP's ticker as the single RAF driver — avoids double-loop jank
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", ScrollTrigger.update);

  const dragCleanups: Array<() => void> = [];
  const hoverCleanups: Array<() => void> = [];
  const floatTweens: Array<gsap.core.Tween> = [];

  revealElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 28
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          once: true
        }
      }
    );
  });

  scaleElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.97,
        y: 14
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          once: true
        }
      }
    );
  });

  document.querySelectorAll<HTMLElement>("[data-float]").forEach((element, index) => {
    const distance = Number(element.dataset.floatDistance ?? 18) + index * 2;
    const duration = Number(element.dataset.floatDuration ?? 6.8) + index * 0.45;

    floatTweens.push(
      gsap.to(element, {
        y: -distance,
        x: index % 2 === 0 ? 1.5 : -1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration
      })
    );
  });

  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
    const shift = Number(element.dataset.parallax ?? 14);

    gsap.fromTo(
      element,
      { yPercent: -shift },
      {
        yPercent: shift,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  document.querySelectorAll<HTMLElement>("[data-luxe-card]").forEach((card) => {
    const media = card.querySelector<HTMLElement>("[data-luxe-media]");
    const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.42, ease: "power3.out" });
    const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.42, ease: "power3.out" });
    const liftTo = gsap.quickTo(card, "y", { duration: 0.42, ease: "power3.out" });
    const scaleTo = media ? gsap.quickTo(media, "scale", { duration: 0.5, ease: "power3.out" }) : undefined;

    const onPointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relativeX - 0.5) * 10;
      const rotateX = (0.5 - relativeY) * 8;

      rotateXTo(rotateX);
      rotateYTo(rotateY);
      liftTo(-8);
      scaleTo?.(1.02);
      card.style.setProperty("--pointer-x", `${relativeX * 100}%`);
      card.style.setProperty("--pointer-y", `${relativeY * 100}%`);
    };

    const onPointerLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      liftTo(0);
      scaleTo?.(1);
      card.style.setProperty("--pointer-x", "50%");
      card.style.setProperty("--pointer-y", "22%");
    };

    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", onPointerLeave);

    hoverCleanups.push(() => {
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", onPointerLeave);
    });
  });

  dragContainers.forEach((container) => {
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    const getPoint = (event: PointerEvent) => event.clientX;

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      startX = getPoint(event);
      startLeft = container.scrollLeft;
      container.classList.add("is-dragging");
      container.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      event.preventDefault();
      const delta = (getPoint(event) - startX) * 1.2;
      gsap.to(container, {
        scrollLeft: startLeft - delta,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const stopDragging = (event?: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      container.classList.remove("is-dragging");
      if (event) {
        container.releasePointerCapture?.(event.pointerId);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", stopDragging);
    container.addEventListener("pointerleave", stopDragging);
    container.addEventListener("pointercancel", stopDragging);

    dragCleanups.push(() => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", stopDragging);
      container.removeEventListener("pointerleave", stopDragging);
      container.removeEventListener("pointercancel", stopDragging);
    });
  });

  cleanup = () => {
    gsap.ticker.remove(lenis.raf);
    lenis.destroy();
    floatTweens.forEach((tween) => tween.kill());
    dragCleanups.forEach((destroy) => destroy());
    hoverCleanups.forEach((destroy) => destroy());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
