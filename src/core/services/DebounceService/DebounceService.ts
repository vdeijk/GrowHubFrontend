class DebounceService {
  public static debounce(func: (...args: unknown[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: unknown[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

export default DebounceService;
