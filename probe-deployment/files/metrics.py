from prometheus_client import Gauge, Histogram, multiprocess, CollectorRegistry
import sys


def prometheus_metrics(responseCode, responseMessage):
    g = Gauge('cdd_probe_total',
              'probe correctness measurements', ['response_code', 'message'],  multiprocess_mode='livesum', registry=CollectorRegistry())
    g.labels(responseCode, responseMessage).inc()


def prometheus_probe_status(response_code, message):
    g = Gauge('cdd_probe_status',
              'probe status', ['response_code', 'message'],  multiprocess_mode='livesum', registry=CollectorRegistry())
    g.labels(response_code, message).inc()


def prometheus_probe_latency(response_code, message, latency):
    """
    Buckets are in seconds
    """
    g = Histogram('cdd_probe_latency_histogram',
                  'probe latency measurement histogram', [
                      'response_code', 'message'],
                  buckets=(0.0005, 0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0, 30.0, 60.0, 300.0, 600.0, 1800.0, 3600.0), registry=CollectorRegistry())
    g.labels(response_code, message).observe(latency)


if __name__ == '__main__':
    if len(sys.argv) == 5:
        globals()[sys.argv[1]](sys.argv[2], sys.argv[3], sys.argv[4])
    if len(sys.argv) == 4:
        globals()[sys.argv[1]](sys.argv[2], sys.argv[3])