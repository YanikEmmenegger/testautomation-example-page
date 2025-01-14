// src/utils/simulateDelay.ts
export function simulateDelay(minSeconds = 0.5, maxSeconds = 10) {
    const ms = Math.random() * (maxSeconds - minSeconds) * 1000 + minSeconds * 1000;
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
