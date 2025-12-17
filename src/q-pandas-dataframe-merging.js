/**
 * TDS Exam Question: Pandas DataFrame Merging and Aggregation
 * 
 * Topic: Advanced Pandas Operations
 * Difficulty: Medium
 * Student: 24f2007461
 * Date: December 17, 2025
 */

export const info = {
  name: "q-pandas-dataframe-merging",
  points: 10,
  desc: `
## Question 1: Pandas DataFrame Merging and Aggregation

**Topic:** Advanced Pandas Operations
**Difficulty:** Medium

**Description:**
You have two CSV files: 
- \`sales.csv\` with columns: \`['order_id', 'product_id', 'quantity', 'date']\`
- \`products.csv\` with columns: \`['product_id', 'product_name', 'category', 'price']\`

Write a Python script using Pandas to: 
1. Read both CSV files
2. Merge them on \`product_id\`
3. Calculate total revenue for each order (quantity × price)
4. Find the top 5 product categories by total revenue
5. Create a new column \`discount\` that gives 10% off for orders with quantity > 10

**Sample Code Template:**
\`\`\`python
import pandas as pd

# Load the data
sales_df = pd.read_csv('sales.csv')
products_df = pd.read_csv('products.csv')

# Your solution here
# Step 1: Merge dataframes
# Step 2: Calculate revenue
# Step 3: Apply discount logic
# Step 4: Group by category and aggregate
# Step 5: Get top 5 categories
\`\`\`

**Expected Skills Tested:**
- DataFrame merging (left, right, inner, outer joins)
- Conditional column creation
- GroupBy and aggregation
- Sorting and filtering

**Learning Outcomes:**
- Master advanced Pandas operations for data analysis
- Understand different types of DataFrame joins
- Apply business logic through conditional operations
- Perform complex aggregations and rankings
  `,
  tags: ["pandas", "dataframe", "merging", "aggregation", "python", "data-analysis"]
};

export default function question(ctx) {
  // Sample data generation for testing
  const generateSampleData = `
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Generate sample sales data
np.random.seed(42)
sales_data = {
    'order_id': range(1, 101),
    'product_id': np.random.choice(range(1, 21), 100),
    'quantity': np.random.choice(range(1, 21), 100),
    'date': [datetime.now() - timedelta(days=x) for x in np.random.choice(range(30), 100)]
}
sales_df = pd.DataFrame(sales_data)
sales_df.to_csv('sales.csv', index=False)

# Generate sample products data
products_data = {
    'product_id': range(1, 21),
    'product_name': [f'Product_{i}' for i in range(1, 21)],
    'category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home', 'Sports'], 20),
    'price': np.random.uniform(10, 500, 20).round(2)
}
products_df = pd.DataFrame(products_data)
products_df.to_csv('products.csv', index=False)

print("Sample data files created: sales.csv and products.csv")
  `;

  const solution = `
# Complete Solution for Pandas DataFrame Merging and Aggregation

import pandas as pd
import numpy as np

def solve_dataframe_merging():
    # Step 1: Read both CSV files
    sales_df = pd.read_csv('sales.csv')
    products_df = pd.read_csv('products.csv')
    
    print("Sales DataFrame shape:", sales_df.shape)
    print("Products DataFrame shape:", products_df.shape)
    print("\\nSales DataFrame head:")
    print(sales_df.head())
    print("\\nProducts DataFrame head:")
    print(products_df.head())
    
    # Step 2: Merge dataframes on product_id
    # Using inner join to keep only matching products
    merged_df = pd.merge(sales_df, products_df, on='product_id', how='inner')
    print(f"\\nMerged DataFrame shape: {merged_df.shape}")
    print("Merged DataFrame head:")
    print(merged_df.head())
    
    # Step 3: Calculate total revenue for each order
    merged_df['revenue'] = merged_df['quantity'] * merged_df['price']
    print("\\nRevenue calculation completed")
    print("Revenue statistics:")
    print(merged_df['revenue'].describe())
    
    # Step 4: Create discount column (10% off for quantity > 10)
    merged_df['discount'] = merged_df['quantity'].apply(
        lambda x: 0.1 if x > 10 else 0.0
    )
    
    # Calculate final revenue after discount
    merged_df['final_revenue'] = merged_df['revenue'] * (1 - merged_df['discount'])
    
    print("\\nDiscount logic applied:")
    print(f"Orders with discount: {(merged_df['discount'] > 0).sum()}")
    print(f"Orders without discount: {(merged_df['discount'] == 0).sum()}")
    
    # Step 5: Group by category and aggregate total revenue
    category_revenue = merged_df.groupby('category').agg({
        'final_revenue': 'sum',
        'quantity': 'sum',
        'order_id': 'count'
    }).round(2)
    
    category_revenue.columns = ['total_revenue', 'total_quantity', 'order_count']
    category_revenue = category_revenue.sort_values('total_revenue', ascending=False)
    
    print("\\nRevenue by Category:")
    print(category_revenue)
    
    # Step 6: Get top 5 product categories by total revenue
    top_5_categories = category_revenue.head(5)
    print("\\nTop 5 Product Categories by Revenue:")
    print(top_5_categories)
    
    # Additional analysis: Best performing products
    product_performance = merged_df.groupby(['product_name', 'category']).agg({
        'final_revenue': 'sum',
        'quantity': 'sum'
    }).round(2)
    
    product_performance = product_performance.sort_values('final_revenue', ascending=False)
    print("\\nTop 10 Products by Revenue:")
    print(product_performance.head(10))
    
    # Save results to CSV
    merged_df.to_csv('sales_analysis_results.csv', index=False)
    category_revenue.to_csv('category_revenue_analysis.csv')
    
    return {
        'merged_data': merged_df,
        'category_analysis': category_revenue,
        'top_categories': top_5_categories,
        'product_analysis': product_performance
    }

# Execute the solution
if __name__ == "__main__":
    results = solve_dataframe_merging()
    print("\\n" + "="*50)
    print("ANALYSIS COMPLETE")
    print("="*50)
    print(f"Total orders processed: {len(results['merged_data'])}")
    print(f"Categories analyzed: {len(results['category_analysis'])}")
    print(f"Total revenue generated: \\$" + f"{results['category_analysis']['total_revenue'].sum():,.2f}")
    print("Results saved to CSV files.")
`;

  return {
    type: "python",
    template: generateSampleData,
    solution: solution,
    testData: {
      expectedFiles: ["sales.csv", "products.csv"],
      expectedColumns: {
        sales: ["order_id", "product_id", "quantity", "date"],
        products: ["product_id", "product_name", "category", "price"]
      },
      expectedOperations: [
        "merge operation",
        "revenue calculation", 
        "discount logic",
        "groupby aggregation",
        "top 5 categories"
      ]
    }
  };
}
