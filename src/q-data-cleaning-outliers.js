// Question 3: Data Cleaning - Outlier Detection
import { html } from "htm/preact";
import { codingQuestion } from "./utils/question.js";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  
  // Generate unique dataset based on roll number
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const dataPoints = 50;
  const dataset = Array.from({ length: dataPoints }, (_, i) => {
    const base = 100 + ((seed + i * 7) % 30);
    // Add some outliers at specific positions
    if (i === 5 || i === 23 || i === 47) {
      return base + 150 + ((seed + i) % 50);
    }
    return base + ((seed + i * 3) % 20) - 10;
  });

  return codingQuestion({
    id: "data-cleaning-outliers",
    weight,
    question: html`
      <h3>Data Cleaning: Outlier Detection and Treatment</h3>
      <p>
        You are analyzing a dataset of daily sales figures. The dataset contains some outliers
        that need to be identified and handled appropriately.
      </p>
      <p>
        Dataset for ${email}:
        <code style="display: block; white-space: pre-wrap; background: #f5f5f5; padding: 10px; margin: 10px 0;">
${JSON.stringify(dataset)}
        </code>
      </p>
      <p>
        Write a Python function <code>clean_outliers(data, method='iqr', threshold=1.5)</code> that:
      </p>
      <ol>
        <li>Detects outliers using the IQR (Interquartile Range) method</li>
        <li>Returns a dictionary with:
          <ul>
            <li><code>'outlier_indices'</code>: list of indices where outliers were found</li>
            <li><code>'outlier_values'</code>: list of the outlier values</li>
            <li><code>'cleaned_data'</code>: original data with outliers replaced by the median</li>
            <li><code>'outlier_count'</code>: total number of outliers found</li>
          </ul>
        </li>
      </ol>
      <p>
        <strong>IQR Method:</strong> A value is an outlier if it's below Q1 - threshold × IQR 
        or above Q3 + threshold × IQR, where IQR = Q3 - Q1.
      </p>
    `,
    solution: `
import statistics

def clean_outliers(data, method='iqr', threshold=1.5):
    """
    Detect and clean outliers from data using IQR method.
    
    Args:
        data: List of numeric values
        method: Method to use ('iqr' only for now)
        threshold: IQR multiplier for outlier detection
    
    Returns:
        Dictionary with outlier information and cleaned data
    """
    if not data or len(data) < 4:
        return {
            'outlier_indices': [],
            'outlier_values': [],
            'cleaned_data': data.copy() if data else [],
            'outlier_count': 0
        }
    
    # Calculate Q1, Q3, and IQR
    sorted_data = sorted(data)
    n = len(sorted_data)
    q1_idx = n // 4
    q3_idx = 3 * n // 4
    
    q1 = sorted_data[q1_idx]
    q3 = sorted_data[q3_idx]
    iqr = q3 - q1
    
    # Calculate bounds
    lower_bound = q1 - threshold * iqr
    upper_bound = q3 + threshold * iqr
    
    # Find outliers
    outlier_indices = []
    outlier_values = []
    
    for i, value in enumerate(data):
        if value < lower_bound or value > upper_bound:
            outlier_indices.append(i)
            outlier_values.append(value)
    
    # Calculate median for replacement
    median = statistics.median(data)
    
    # Create cleaned data
    cleaned_data = [
        median if i in outlier_indices else value 
        for i, value in enumerate(data)
    ]
    
    return {
        'outlier_indices': outlier_indices,
        'outlier_values': outlier_values,
        'cleaned_data': cleaned_data,
        'outlier_count': len(outlier_indices)
    }

# Test with the provided dataset
data = ${JSON.stringify(dataset)}
result = clean_outliers(data)
print(result)
`,
    test: (code) => {
      // Test will be run in Python environment
      return `
${code}

# Test cases
data = ${JSON.stringify(dataset)}
result = clean_outliers(data)

# Verify result structure
assert 'outlier_indices' in result, "Missing 'outlier_indices' key"
assert 'outlier_values' in result, "Missing 'outlier_values' key"
assert 'cleaned_data' in result, "Missing 'cleaned_data' key"
assert 'outlier_count' in result, "Missing 'outlier_count' key"

# Verify counts match
assert result['outlier_count'] == len(result['outlier_indices']), "Outlier count mismatch"
assert len(result['outlier_indices']) == len(result['outlier_values']), "Indices and values length mismatch"

# Verify cleaned data length
assert len(result['cleaned_data']) == len(data), "Cleaned data length mismatch"

# Verify outliers were actually outliers
import statistics
if len(data) >= 4:
    sorted_data = sorted(data)
    n = len(sorted_data)
    q1 = sorted_data[n // 4]
    q3 = sorted_data[3 * n // 4]
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    
    for idx, val in zip(result['outlier_indices'], result['outlier_values']):
        assert val < lower_bound or val > upper_bound, f"Value {val} at index {idx} is not an outlier"

print("All tests passed!")
`;
    },
  });
}