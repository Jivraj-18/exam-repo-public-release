// Question 2: Correlation Analysis and Feature Selection
import { html } from "htm/preact";
import { codingQuestion } from "./utils/question.js";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  
  // Generate unique dataset based on roll number
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const n = 15;
  
  const feature1 = Array.from({ length: n }, (_, i) => 
    10 + ((seed + i * 7) % 20)
  );
  
  const feature2 = Array.from({ length: n }, (_, i) => 
    5 + ((seed + i * 11) % 15)
  );
  
  // Target has correlation with feature1
  const target = feature1.map((val, i) => 
    Math.round(val * 1.5 + ((seed + i * 3) % 10) - 5)
  );

  return codingQuestion({
    id: "correlation-analysis",
    weight,
    question: html`
      <h3>Correlation Analysis for Feature Selection</h3>
      <p>
        You have a dataset with two features and a target variable. You need to analyze
        the correlation between features and the target to determine feature importance.
      </p>
      <p>
        Dataset for ${email}:
        <code style="display: block; white-space: pre-wrap; background: #f5f5f5; padding: 10px; margin: 10px 0;">
Feature 1: ${JSON.stringify(feature1)}
Feature 2: ${JSON.stringify(feature2)}
Target: ${JSON.stringify(target)}
        </code>
      </p>
      <p>
        Write a Python function <code>correlation_analysis(features_dict, target)</code> that:
      </p>
      <ol>
        <li>Calculates Pearson correlation coefficient between each feature and target</li>
        <li>Calculates correlation between features (multicollinearity check)</li>
        <li>Returns a dictionary with:
          <ul>
            <li><code>'feature_target_corr'</code>: Dict mapping feature name to correlation with target</li>
            <li><code>'feature_correlations'</code>: Dict of dicts showing correlation between all features</li>
            <li><code>'ranked_features'</code>: List of feature names ranked by absolute correlation with target (descending)</li>
            <li><code>'highly_correlated_pairs'</code>: List of feature pairs with absolute correlation > 0.7</li>
            <li><code>'recommended_features'</code>: List of features to keep (|correlation with target| > 0.3)</li>
          </ul>
        </li>
      </ol>
      <p>
        <strong>Pearson Correlation:</strong> r = Σ[(xi - x̄)(yi - ȳ)] / √[Σ(xi - x̄)² × Σ(yi - ȳ)²]
      </p>
    `,
    solution: `
import math

def correlation_analysis(features_dict, target):
    """
    Analyze correlations between features and target variable.
    
    Args:
        features_dict: Dictionary mapping feature names to lists of values
        target: List of target values
    
    Returns:
        Dictionary with correlation analysis results
    """
    def pearson_correlation(x, y):
        """Calculate Pearson correlation coefficient."""
        if len(x) != len(y) or len(x) == 0:
            return 0.0
        
        n = len(x)
        
        # Calculate means
        mean_x = sum(x) / n
        mean_y = sum(y) / n
        
        # Calculate correlation
        numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
        
        sum_sq_x = sum((x[i] - mean_x) ** 2 for i in range(n))
        sum_sq_y = sum((y[i] - mean_y) ** 2 for i in range(n))
        
        denominator = math.sqrt(sum_sq_x * sum_sq_y)
        
        if denominator == 0:
            return 0.0
        
        return numerator / denominator
    
    # Calculate feature-target correlations
    feature_target_corr = {}
    for feature_name, feature_values in features_dict.items():
        corr = pearson_correlation(feature_values, target)
        feature_target_corr[feature_name] = round(corr, 4)
    
    # Calculate feature-feature correlations
    feature_names = list(features_dict.keys())
    feature_correlations = {}
    
    for i, name1 in enumerate(feature_names):
        feature_correlations[name1] = {}
        for name2 in feature_names:
            if name1 == name2:
                feature_correlations[name1][name2] = 1.0
            else:
                corr = pearson_correlation(
                    features_dict[name1], 
                    features_dict[name2]
                )
                feature_correlations[name1][name2] = round(corr, 4)
    
    # Rank features by absolute correlation with target
    ranked_features = sorted(
        feature_names,
        key=lambda x: abs(feature_target_corr[x]),
        reverse=True
    )
    
    # Find highly correlated feature pairs
    highly_correlated_pairs = []
    for i, name1 in enumerate(feature_names):
        for name2 in feature_names[i+1:]:
            corr = abs(feature_correlations[name1][name2])
            if corr > 0.7:
                highly_correlated_pairs.append({
                    'feature1': name1,
                    'feature2': name2,
                    'correlation': round(corr, 4)
                })
    
    # Recommend features with |correlation| > 0.3
    recommended_features = [
        name for name in feature_names
        if abs(feature_target_corr[name]) > 0.3
    ]
    
    return {
        'feature_target_corr': feature_target_corr,
        'feature_correlations': feature_correlations,
        'ranked_features': ranked_features,
        'highly_correlated_pairs': highly_correlated_pairs,
        'recommended_features': recommended_features
    }

# Test with the provided dataset
features = {
    'feature1': ${JSON.stringify(feature1)},
    'feature2': ${JSON.stringify(feature2)}
}
target = ${JSON.stringify(target)}

result = correlation_analysis(features, target)
print(result)
`,
    test: (code) => {
      return `
${code}

# Test cases
features = {
    'feature1': ${JSON.stringify(feature1)},
    'feature2': ${JSON.stringify(feature2)}
}
target = ${JSON.stringify(target)}

result = correlation_analysis(features, target)

# Check structure
assert 'feature_target_corr' in result, "Missing 'feature_target_corr'"
assert 'feature_correlations' in result, "Missing 'feature_correlations'"
assert 'ranked_features' in result, "Missing 'ranked_features'"
assert 'highly_correlated_pairs' in result, "Missing 'highly_correlated_pairs'"
assert 'recommended_features' in result, "Missing 'recommended_features'"

# Check feature_target_corr has all features
assert 'feature1' in result['feature_target_corr'], "Missing feature1 correlation"
assert 'feature2' in result['feature_target_corr'], "Missing feature2 correlation"

# Check correlation values are in valid range [-1, 1]
for feature, corr in result['feature_target_corr'].items():
    assert -1 <= corr <= 1, f"Correlation for {feature} out of range: {corr}"

# Check feature_correlations structure
assert 'feature1' in result['feature_correlations'], "Missing feature1 in correlations"
assert 'feature2' in result['feature_correlations'], "Missing feature2 in correlations"

# Check diagonal is 1.0 (self-correlation)
assert result['feature_correlations']['feature1']['feature1'] == 1.0, "Self-correlation should be 1.0"
assert result['feature_correlations']['feature2']['feature2'] == 1.0, "Self-correlation should be 1.0"

# Check symmetry of correlation matrix
assert result['feature_correlations']['feature1']['feature2'] == result['feature_correlations']['feature2']['feature1'], "Correlation matrix should be symmetric"

# Check ranked_features is sorted by absolute correlation
ranked = result['ranked_features']
assert len(ranked) == 2, "Should have 2 ranked features"
abs_corrs = [abs(result['feature_target_corr'][f]) for f in ranked]
assert abs_corrs == sorted(abs_corrs, reverse=True), "Features not ranked correctly"

# Check highly_correlated_pairs structure
for pair in result['highly_correlated_pairs']:
    assert 'feature1' in pair, "Pair missing 'feature1'"
    assert 'feature2' in pair, "Pair missing 'feature2'"
    assert 'correlation' in pair, "Pair missing 'correlation'"
    assert pair['correlation'] > 0.7, "Correlation should be > 0.7"

# Check recommended_features only includes features with |corr| > 0.3
for feature in result['recommended_features']:
    assert abs(result['feature_target_corr'][feature]) > 0.3, f"{feature} should have |correlation| > 0.3"

print("All tests passed!")
`;
    },
  });
}