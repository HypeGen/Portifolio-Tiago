// Simple error monitoring and logging
// Captures unhandled errors and sends to PostHog (already configured in index.html)

export const initErrorTracking = () => {
  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('[Error Tracking]', event.error);
    if (window.posthog) {
      window.posthog.captureException(event.error, {
        tags: {
          type: 'runtime_error',
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
        },
      });
    }
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Promise Rejection]', event.reason);
    if (window.posthog) {
      window.posthog.captureException(event.reason, {
        tags: {
          type: 'unhandled_rejection',
        },
      });
    }
  });

  // Performance monitoring
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log('[Performance Metrics]', {
        pageLoadTime: `${pageLoadTime}ms`,
        connectTime: `${connectTime}ms`,
        renderTime: `${renderTime}ms`,
      });

      if (window.posthog) {
        window.posthog.capture('page_performance', {
          pageLoadTime,
          connectTime,
          renderTime,
        });
      }
    });
  }

  console.log('[Monitoring] Error tracking and performance monitoring initialized');
};

// Export for use in App.js
