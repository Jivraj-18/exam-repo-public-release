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
      <p>Create stateful stream processor with checkpointing:</p>
      <pre><code>from pyflink.datastream import StreamExecutionEnvironment
from pyflink.datastream.state import ValueStateDescriptor
from pyflink.datastream.window import TumblingEventTimeWindows
from pyflink.common import Time, WatermarkStrategy
from pyflink.common.serialization import SimpleStringSchema

env = StreamExecutionEnvironment.get_execution_environment()
env.set_parallelism(${parallelism})
env.enable_checkpointing(30000)  # 30 second intervals
env.get_checkpoint_config().set_checkpointing_mode(
    CheckpointingMode.EXACTLY_ONCE
)

class FraudDetectionFunction(KeyedProcessFunction):
    def __init__(self):
        self.transaction_state = None
        self.alert_state = None
    
    def open(self, context):
        # State: Recent transaction patterns
        tx_descriptor = ValueStateDescriptor(
            "transactions",
            Types.LIST(Types.TUPLE([
                Types.DOUBLE(),  # amount
                Types.LONG(),    # timestamp
                Types.STRING()   # location
            ]))
        )
        self.transaction_state = context.get_state(tx_descriptor)
        
        # State: Alert cooldown (prevent spam)
        alert_descriptor = ValueStateDescriptor(
            "last_alert",
            Types.LONG()
        )
        self.alert_state = context.get_state(alert_descriptor)
    
    def process_element(self, value, ctx):
        # Detect patterns:
        # 1. Velocity: >3 transactions in ${windowSize} minutes
        # 2. Geography: transactions from 2+ countries in 1 hour
        # 3. Amount: sudden 10x increase from average
        
        transactions = self.transaction_state.value() or []
        current_time = ctx.timestamp()
        
        # Window: last ${windowSize} minutes
        window_start = current_time - ${windowSize * 60000}
        recent_txs = [tx for tx in transactions 
                      if tx[1] > window_start]
        
        # Fraud detection logic
        if self._is_fraudulent(value, recent_txs):
            last_alert = self.alert_state.value() or 0
            if current_time - last_alert > 300000:  # 5 min cooldown
                yield (value['user_id'], 'FRAUD_ALERT', current_time)
                self.alert_state.update(current_time)
        
        # Update state
        recent_txs.append((
            value['amount'],
            current_time,
            value['location']
        ))
        self.transaction_state.update(recent_txs[-100:])  # Keep last 100
    
    def _is_fraudulent(self, tx, history):
        # Implement sophisticated fraud rules
        pass

# Data source with watermarks
transactions = env.from_source(
    KafkaSource.builder()
        .set_bootstrap_servers("kafka:9092")
        .set_topics("transactions")
        .set_value_only_deserializer(SimpleStringSchema())
        .build(),
    WatermarkStrategy
        .for_bounded_out_of_orderness(
            Duration.of_seconds(${lateDataTolerance})
        )
        .with_timestamp_assigner(
            lambda event: event['timestamp']
        ),
    "kafka-source"
)

# Processing pipeline
alerts = (transactions
    .key_by(lambda x: x['user_id'])
    .process(FraudDetectionFunction())
    .name("fraud-detection"))

# Sink to output
alerts.add_sink(
    KafkaSink.builder()
        .set_bootstrap_servers("kafka:9092")
        .set_record_serializer(...)
        .build()
)

env.execute("Fraud Detection Pipeline")</code></pre>

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
        <li>Load test achieving ${throughput.toLocaleString()} events/sec</li>
        <li>Checkpoint recovery demonstration (<1 second RTO)</li>
        <li>Grafana dashboard with 15+ metrics</li>
        <li>Backpressure analysis report</li>
      </ol>

      <h3>Test Scenarios</h3>
      <ul>
        <li><strong>Throughput:</strong> Sustain ${throughput.toLocaleString()} events/sec for 10 minutes</li>
        <li><strong>Late data:</strong> Handle events ${lateDataTolerance}s out-of-order</li>
        <li><strong>Fault tolerance:</strong> Kill 2 TaskManagers mid-job, recover without data loss</li>
        <li><strong>Scaling:</strong> Scale from ${Math.floor(parallelism/2)} to ${parallelism} workers during runtime</li>
      </ul>

      <p><strong>Bonus (+1.5):</strong> Implement session windows for user behavior tracking with custom triggers.</p>
    `,
    answer: null,
  };
}
