export function useIsMobile() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  return { isMobile }
}
