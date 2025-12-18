export default function ({ user, weight = 1 }) {
  return {
    id: "q-data-pipeline-recovery",
    weight,
    question: `
      <h3>Fault-Tolerant Data Pipeline</h3>
      <p>Build a data pipeline that processes CSV files with these requirements:</p>
      <ul>
        <li>Read from S3 bucket (1000+ files, ~100MB each)</li>
        <li>Transform: normalize dates, validate emails, deduplicate</li>
        <li>Load to PostgreSQL database</li>
        <li>Handle corrupt files gracefully</li>
        <li>Support resuming from last successful checkpoint</li>
      </ul>
      <p><strong>Implement using Python with proper error handling and checkpoint recovery.</strong></p>
    `,
    input: "textarea",
    answer: String.raw`import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
import boto3
import json
from pathlib import Path
import logging

class DataPipeline:
    def __init__(self, bucket_name, db_config, checkpoint_file='checkpoint.json'):
        self.s3 = boto3.client('s3')
        self.bucket = bucket_name
        self.db_config = db_config
        self.checkpoint_file = checkpoint_file
        self.processed_files = self._load_checkpoint()
        
    def _load_checkpoint(self):
        if Path(self.checkpoint_file).exists():
            with open(self.checkpoint_file, 'r') as f:
                return set(json.load(f))
        return set()
    
    def _save_checkpoint(self):
        with open(self.checkpoint_file, 'w') as f:
            json.dump(list(self.processed_files), f)
    
    def transform_data(self, df):
        df = df.dropna()
        df = df.drop_duplicates()
        return df
        
    def process_file(self, file_key):
        if file_key in self.processed_files:
            return 0
        
        try:
            obj = self.s3.get_object(Bucket=self.bucket, Key=file_key)
            df = pd.read_csv(obj['Body'], on_bad_lines='skip')
            df_clean = self.transform_data(df)
            
            with psycopg2.connect(**self.db_config) as conn:
                with conn.cursor() as cur:
                    execute_values(cur, "INSERT INTO users VALUES %s", df_clean.to_records(index=False))
                conn.commit()
            
            self.processed_files.add(file_key)
            self._save_checkpoint()
            return len(df_clean)
        except Exception as e:
            logging.error(f"Error processing {file_key}: {e}")
            return 0`,
  };
}
