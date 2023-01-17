"""Application server"""
from prometheus_client import Gauge, start_http_server, CollectorRegistry, multiprocess
import logging
import os
import subprocess
import time
import sys


def main():
    """Main entry point"""
    registry = CollectorRegistry()
    multiprocess.MultiProcessCollector(registry)
    start_http_server(
        9877, registry=registry)
    while True:
        "Up"


if __name__ == "__main__":
    main()
