// Advanced: Real-time Distributed Stream Processing with Apache Flink
// Weight: 9.0 marks
// Tests: Flink streaming, state management, watermarks, exactly-once semantics

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  const throughput = 100000 + Math.floor(rng() * 400000); // 100k-500k events/sec
  const windowSize = 5 + Math.floor(rng() * 10); // 5-14 minutes
  const lateDataTolerance = 30 + Math.floor(rng() * 90); // 30-119 seconds
  const parallelism = 8 + Math.floor(rng() * 8); // 8-15 parallel tasks

  return {
    id: 'flink-stream-processing',
    title: 'Apache Flink: Distributed Real-Time Analytics at Scale',
    weight,
    question: html`
      <p><strong>Scenario:</strong> Build a real-time fraud detection system processing ${throughput.toLocaleString()} transactions/second with exactly-once guarantees.</p>
      
      <h3>Architecture Requirements</h3>
      
      <h4>Part A: Flink Job Implementation (3.5 marks)</h4>
      <p>Create stateful stream processor with checkpointing (use Docker for Kafka/Flink):</p>
      <pre><code># docker-compose.yml to setup environment
version: '3'
services:
  kafka:
    image: confluentinc/cp-kafka:latest
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
  flink-jobmanager:
    image: flink:latest
    command: jobmanager
  
# Install: pip install apache-flink kafka-python

from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.state import ValueStateDescriptor
from pyflink.datastream.functions import KeyedProcessFunction
from pyflink.common import Types, Time
import json

env = StreamExecutionEnvironment.get_execution_environment()
env.set_parallelism(${parallelism})
env.enable_checkpointing(30000)

class FraudDetectionFunction(KeyedProcessFunction):
    def __init__(self):
        self.transaction_state = None
        self.alert_state = None
    
    def open(self, context):
        tx_descriptor = ValueStateDescriptor(
            "transactions",
            Types.LIST(Types.TUPLE([
                Types.DOUBLE(),  # amount
                Types.LONG(),    # timestamp
                Types.STRING()   # location
            ]))
        )
        self.transaction_state = context.get_state(tx_descriptor)
        
        alert_descriptor = ValueStateDescriptor(
            "last_alert", Types.LONG()
        )
        self.alert_state = context.get_state(alert_descriptor)
    
    def process_element(self, value, ctx):
        # Parse transaction (simulate with random data)
        tx = json.loads(value) if isinstance(value, str) else value
        
        transactions = self.transaction_state.value() or []
        current_time = ctx.timestamp()
        
        # Window: last ${windowSize} minutes
        window_start = current_time - ${windowSize * 60000}
        recent_txs = [t for t in transactions if t[1] > window_start]
        
        # Fraud detection rules:
        # 1. >3 transactions in ${windowSize} minutes
        # 2. Different countries in 1 hour
        # 3. 10x amount increase
        
        is_fraud = False
        if len(recent_txs) > 3:
            is_fraud = True
        
        if is_fraud:
            last_alert = self.alert_state.value() or 0
            if current_time - last_alert > 300000:
                yield (tx['user_id'], 'FRAUD_ALERT', current_time)
                self.alert_state.update(current_time)
        
        recent_txs.append((tx['amount'], current_time, tx['location']))
        self.transaction_state.update(recent_txs[-100:])

# Simulate transaction stream (for testing without Kafka)
def generate_transactions():
    import random
    for i in range(${Math.floor(throughput/10)}):
        yield json.dumps({
            'user_id': f'user_{random.randint(1, 1000)}',
            'amount': random.uniform(10, 1000),
            'location': random.choice(['US', 'UK', 'IN']),
            'timestamp': int(time.time() * 1000)
        })

transactions = env.from_collection(list(generate_transactions()))

alerts = (transactions
    .key_by(lambda x: json.loads(x)['user_id'])
    .process(FraudDetectionFunction())
    .name("fraud-detection"))

alerts.print()
env.execute("Fraud Detection")</code></pre>

      <h4>Part B: Performance Tuning (2.5 marks)</h4>
      <p>Optimize for ${throughput.toLocaleString()} events/sec:</p>
      <pre><code># flink-conf.yaml
taskmanager.numberOfTaskSlots: ${parallelism}
taskmanager.memory.process.size: 8192m
taskmanager.memory.managed.fraction: 0.4

# Network buffers for backpressure
taskmanager.network.memory.fraction: 0.15
taskmanager.network.memory.min: 256mb
taskmanager.network.memory.max: 1gb

# Checkpoint tuning
state.backend: rocksdb
state.backend.incremental: true
state.checkpoint-storage: filesystem
state.checkpoint-storage.path: s3://checkpoints/

# Tuning watermarks for late data
pipeline.auto-watermark-interval: 200ms</code></pre>

      <h4>Part C: Monitoring & Metrics (3.0 marks)</h4>
      <p>Implement comprehensive observability:</p>
      <pre><code>from pyflink.common import MetricGroup

class MetricsCollector(RichMapFunction):
    def open(self, config):
        self.counter = (
            self.get_runtime_context()
            .get_metric_group()
            .counter("fraud_alerts")
        )
        self.latency_meter = (
            self.get_runtime_context()
            .get_metric_group()
            .meter("processing_latency", 
                   MeterView(60))  # 60 second window
        )
    
    def map(self, value):
        latency = time.time() - value['timestamp']
        self.latency_meter.mark_event()
        
        if value['type'] == 'FRAUD_ALERT':
            self.counter.inc()
        
        return value

# Deploy with Prometheus metrics endpoint
# Track: throughput, latency p50/p95/p99, backpressure, checkpoint duration</code></pre>

      <h3>Deliverables</h3>
      <ol>
        <li>Complete Flink job with exactly-once semantics</li>
        <li>Python script demonstrating fraud detection on simulated data</li>
        <li>Performance benchmark showing throughput metrics</li>
        <li>Screenshot of Flink Web UI showing running job</li>
        <li>README with setup instructions (Docker Compose)</li>
      </ol>

      <h3>Test Scenarios (can simulate locally)</h3>
      <ul>
        <li><strong>Throughput:</strong> Process generated transactions at high rate</li>
        <li><strong>Late data:</strong> Inject out-of-order events in simulation</li>
        <li><strong>Stateful processing:</strong> Demonstrate state recovery after restart</li>
        <li><strong>Fraud detection:</strong> Show alerts triggered on suspicious patterns</li>
      </ul>

      <p><strong>Bonus (+1.5):</strong> Implement session windows for user behavior tracking with custom triggers.</p>
    `,
    answer: null,
  };
}
