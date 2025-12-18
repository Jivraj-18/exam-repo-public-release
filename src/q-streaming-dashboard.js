export default function ({ user, weight = 1 }) {
  return {
    id: "q-streaming-dashboard",
    weight,
    question: `
      <h3>Real-time Streaming Dashboard</h3>
      <p>Create a real-time dashboard that visualizes streaming data from Kafka:</p>
      <ul>
        <li>Consume messages from Kafka topic (10,000+ messages/sec)</li>
        <li>Aggregate data in 1-minute windows</li>
        <li>Calculate: mean, median, 95th percentile, count</li>
        <li>Update visualization every second without blocking</li>
        <li>Handle out-of-order events (up to 5 seconds late)</li>
      </ul>
      <p><strong>Use Python with kafka-python and plotly/dash for visualization.</strong></p>
    `,
    input: "textarea",
    answer: String.raw`from kafka import KafkaConsumer
import json
from datetime import datetime
from collections import defaultdict
import threading
import numpy as np
from dash import Dash, dcc, html
from dash.dependencies import Input, Output

class StreamingAggregator:
    def __init__(self, window_size=60):
        self.window_size = window_size
        self.windows = defaultdict(lambda: {'values': [], 'count': 0})
        self.lock = threading.Lock()
    
    def add_event(self, event):
        timestamp = event['timestamp']
        value = event['value']
        window_key = timestamp[:16]
        
        with self.lock:
            window = self.windows[window_key]
            window['values'].append(value)
            window['count'] += 1
    
    def compute_statistics(self):
        with self.lock:
            stats = {}
            for window_key, window_data in self.windows.items():
                if window_data['count'] > 0:
                    values = window_data['values']
                    stats[window_key] = {
                        'mean': np.mean(values),
                        'median': np.median(values),
                        'p95': np.percentile(values, 95),
                        'count': window_data['count']
                    }
            return stats

consumer = KafkaConsumer('events', bootstrap_servers=['localhost:9092'])
aggregator = StreamingAggregator()

app = Dash(__name__)
app.layout = html.Div([
    html.H1("Real-time Streaming Dashboard"),
    dcc.Graph(id='live-graph'),
    dcc.Interval(id='interval', interval=1000)
])

@app.callback(Output('live-graph', 'figure'), Input('interval', 'n_intervals'))
def update_graph(n):
    stats = aggregator.compute_statistics()
    return {'data': [{'x': list(stats.keys()), 'y': [s['mean'] for s in stats.values()]}]}`,
  };
}
