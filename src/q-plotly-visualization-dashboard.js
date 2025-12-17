/**
 * TDS Exam Question: Data Visualization Dashboard with Plotly
 * 
 * Topic: Interactive Data Visualization
 * Difficulty: Medium
 * Student: 24f2007461
 * Date: December 17, 2025
 */

export const info = {
  name: "q-plotly-visualization-dashboard",
  points: 10,
  desc: `
## Question 4: Data Visualization Dashboard with Plotly

**Topic:** Interactive Data Visualization
**Difficulty:** Medium

**Description:**
You have a dataset \`employee_data.csv\` with columns:
\`['employee_id', 'department', 'years_experience', 'salary', 'performance_score', 'projects_completed', 'overtime_hours']\`

Create an interactive visualization dashboard with: 

1. **Scatter Plot**: Years of experience vs Salary, colored by department, with size representing performance score
2. **Box Plot**: Salary distribution across different departments
3. **Heatmap**: Correlation matrix between numerical columns
4. **Bar Chart**: Average projects completed by department
5. **Histogram**: Distribution of overtime hours with department-wise split

Use Plotly for interactivity and Matplotlib/Seaborn for static plots.

**Sample Code Template:**
\`\`\`python
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import seaborn as sns
from plotly.subplots import make_subplots

# Load data
df = pd.read_csv('employee_data.csv')

# 1. Interactive Scatter Plot
fig1 = px.scatter(
    # Your parameters here
)

# 2. Box Plot
fig2 = px.box(
    # Your parameters here
)

# 3. Correlation Heatmap
correlation_matrix = df.select_dtypes(include=['float64', 'int64']).corr()
fig3 = px.imshow(
    # Your parameters here
)

# 4. Bar Chart - Average projects by department
# Your code here

# 5. Histogram with department split
# Your code here

# Display all plots
\`\`\`

**Expected Skills Tested:**
- Plotly Express for quick visualizations
- Plotly Graph Objects for custom plots
- Correlation analysis
- Multi-plot layouts
- Interactive features (hover, zoom, filter)

**Learning Outcomes:**
- Master interactive data visualization with Plotly
- Understand correlation analysis and heatmaps
- Create multi-plot dashboards
- Apply color coding and sizing for data insights
  `,
  tags: ["plotly", "visualization", "dashboard", "python", "data-analysis", "interactive"]
};

export default function question(ctx) {
  // Sample data generation for testing
  const generateSampleData = `
import pandas as pd
import numpy as np
import random

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Generate sample employee data
departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']
n_employees = 200

employee_data = {
    'employee_id': [f'EMP{str(i).zfill(4)}' for i in range(1, n_employees + 1)],
    'department': np.random.choice(departments, n_employees),
    'years_experience': np.random.randint(0, 15, n_employees),
    'performance_score': np.random.uniform(3.0, 10.0, n_employees).round(1),
    'projects_completed': np.random.randint(1, 20, n_employees),
    'overtime_hours': np.random.exponential(scale=5, size=n_employees).round(1)
}

# Create salary based on experience and performance with some randomness
base_salary = 40000
employee_data['salary'] = (
    base_salary + 
    employee_data['years_experience'] * 3000 + 
    employee_data['performance_score'] * 2000 + 
    np.random.normal(0, 5000, n_employees)
).astype(int)

df = pd.DataFrame(employee_data)
df.to_csv('employee_data.csv', index=False)

print("Sample employee data created: employee_data.csv")
print(f"Dataset shape: {df.shape}")
print("\\nDataset preview:")
print(df.head())
print("\\nDataset info:")
print(df.info())
  `;

  const solution = `
# Complete Solution for Data Visualization Dashboard with Plotly

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import seaborn as sns
from plotly.subplots import make_subplots
import numpy as np

def create_visualization_dashboard():
    # Load the data
    df = pd.read_csv('employee_data.csv')
    
    print("Employee Data Dashboard")
    print("=" * 50)
    print(f"Dataset shape: {df.shape}")
    print("\\nDataset overview:")
    print(df.describe())
    
    # 1. Interactive Scatter Plot: Years of experience vs Salary
    print("\\n1. Creating scatter plot: Experience vs Salary")
    fig1 = px.scatter(
        df, 
        x='years_experience', 
        y='salary',
        color='department',
        size='performance_score',
        hover_data=['employee_id', 'projects_completed', 'overtime_hours'],
        title='Years of Experience vs Salary by Department',
        labels={
            'years_experience': 'Years of Experience',
            'salary': 'Annual Salary ($)',
            'performance_score': 'Performance Score'
        }
    )
    fig1.update_traces(opacity=0.7)
    fig1.show()
    
    # 2. Box Plot: Salary distribution across departments
    print("\\n2. Creating box plot: Salary distribution by department")
    fig2 = px.box(
        df, 
        x='department', 
        y='salary',
        color='department',
        title='Salary Distribution Across Departments',
        labels={
            'department': 'Department',
            'salary': 'Annual Salary ($)'
        }
    )
    fig2.update_layout(showlegend=False)
    fig2.show()
    
    # 3. Correlation Heatmap
    print("\\n3. Creating correlation heatmap")
    numerical_cols = ['years_experience', 'salary', 'performance_score', 
                     'projects_completed', 'overtime_hours']
    correlation_matrix = df[numerical_cols].corr()
    
    fig3 = px.imshow(
        correlation_matrix,
        text_auto=True,
        aspect="auto",
        title='Correlation Matrix of Numerical Variables',
        color_continuous_scale='RdBu_r',
        range_color=[-1, 1]
    )
    fig3.show()
    
    # 4. Bar Chart: Average projects completed by department
    print("\\n4. Creating bar chart: Average projects by department")
    dept_projects = df.groupby('department')['projects_completed'].agg(['mean', 'std']).reset_index()
    
    fig4 = px.bar(
        dept_projects, 
        x='department', 
        y='mean',
        error_y='std',
        title='Average Projects Completed by Department',
        labels={
            'department': 'Department',
            'mean': 'Average Projects Completed'
        }
    )
    fig4.update_traces(marker_color='skyblue')
    fig4.show()
    
    # 5. Histogram: Distribution of overtime hours with department split
    print("\\n5. Creating histogram: Overtime hours distribution")
    fig5 = px.histogram(
        df, 
        x='overtime_hours', 
        color='department',
        marginal='box',
        nbins=20,
        title='Distribution of Overtime Hours by Department',
        labels={
            'overtime_hours': 'Overtime Hours',
            'count': 'Number of Employees'
        }
    )
    fig5.show()
    
    # 6. Combined Dashboard using subplots
    print("\\n6. Creating combined dashboard")
    fig6 = make_subplots(
        rows=2, cols=2,
        subplot_titles=('Performance vs Salary', 'Department Sizes', 
                       'Experience Distribution', 'Salary vs Projects'),
        specs=[[{"secondary_y": False}, {"secondary_y": False}],
               [{"secondary_y": False}, {"secondary_y": False}]]
    )
    
    # Add scatter plot
    for dept in df['department'].unique():
        dept_data = df[df['department'] == dept]
        fig6.add_trace(
            go.Scatter(
                x=dept_data['performance_score'],
                y=dept_data['salary'],
                mode='markers',
                name=dept,
                text=dept_data['employee_id'],
                hovertemplate='<b>%{text}</b><br>Performance: %{x}<br>Salary: $%{y}<extra></extra>'
            ),
            row=1, col=1
        )
    
    # Add department count bar chart
    dept_counts = df['department'].value_counts()
    fig6.add_trace(
        go.Bar(x=dept_counts.index, y=dept_counts.values, name='Employee Count'),
        row=1, col=2
    )
    
    # Add experience histogram
    fig6.add_trace(
        go.Histogram(x=df['years_experience'], name='Experience Distribution'),
        row=2, col=1
    )
    
    # Add salary vs projects scatter
    fig6.add_trace(
        go.Scatter(
            x=df['projects_completed'],
            y=df['salary'],
            mode='markers',
            name='Salary vs Projects',
            opacity=0.6
        ),
        row=2, col=2
    )
    
    fig6.update_layout(
        height=800,
        title_text="Employee Analytics Dashboard",
        showlegend=True
    )
    fig6.show()
    
    # 7. Additional Analysis with Matplotlib/Seaborn
    print("\\n7. Creating static plots with Matplotlib/Seaborn")
    
    plt.figure(figsize=(15, 10))
    
    # Subplot 1: Seaborn pairplot
    plt.subplot(2, 3, 1)
    sns.scatterplot(data=df, x='years_experience', y='salary', hue='department')
    plt.title('Experience vs Salary')
    
    # Subplot 2: Department salary violin plot
    plt.subplot(2, 3, 2)
    sns.violinplot(data=df, x='department', y='salary')
    plt.xticks(rotation=45)
    plt.title('Salary Distribution by Department')
    
    # Subplot 3: Performance distribution
    plt.subplot(2, 3, 3)
    sns.histplot(data=df, x='performance_score', hue='department', alpha=0.7)
    plt.title('Performance Score Distribution')
    
    # Subplot 4: Correlation heatmap
    plt.subplot(2, 3, 4)
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
    plt.title('Correlation Matrix')
    
    # Subplot 5: Projects vs overtime
    plt.subplot(2, 3, 5)
    sns.scatterplot(data=df, x='projects_completed', y='overtime_hours', 
                   size='salary', hue='department', alpha=0.7)
    plt.title('Projects vs Overtime Hours')
    
    # Subplot 6: Department statistics
    plt.subplot(2, 3, 6)
    dept_stats = df.groupby('department')[['salary', 'performance_score']].mean()
    dept_stats.plot(kind='bar', ax=plt.gca())
    plt.title('Average Salary & Performance by Department')
    plt.xticks(rotation=45)
    
    plt.tight_layout()
    plt.savefig('employee_dashboard_static.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    # 8. Summary statistics
    print("\\n8. Summary Statistics")
    print("=" * 50)
    
    summary_stats = df.groupby('department').agg({
        'salary': ['mean', 'median', 'std'],
        'years_experience': ['mean', 'max'],
        'performance_score': ['mean', 'min', 'max'],
        'projects_completed': ['mean', 'sum'],
        'overtime_hours': ['mean', 'max']
    }).round(2)
    
    print("Summary statistics by department:")
    print(summary_stats)
    
    # Find top performers
    top_performers = df.nlargest(10, 'performance_score')[
        ['employee_id', 'department', 'performance_score', 'salary', 'years_experience']
    ]
    print("\\nTop 10 Performers:")
    print(top_performers)
    
    # Save results
    summary_stats.to_csv('department_summary_stats.csv')
    top_performers.to_csv('top_performers.csv', index=False)
    
    return {
        'summary_stats': summary_stats,
        'top_performers': top_performers,
        'correlation_matrix': correlation_matrix
    }

# Execute the solution
if __name__ == "__main__":
    results = create_visualization_dashboard()
    print("\\n" + "="*50)
    print("DASHBOARD CREATION COMPLETE")
    print("="*50)
    print("All visualizations have been generated and saved.")
    print("Static plots saved as 'employee_dashboard_static.png'")
    print("Summary statistics saved as CSV files.")
  `;

  return {
    type: "python",
    template: generateSampleData,
    solution: solution,
    testData: {
      expectedFiles: ["employee_data.csv"],
      expectedColumns: {
        employee: ["employee_id", "department", "years_experience", "salary", "performance_score", "projects_completed", "overtime_hours"]
      },
      expectedPlots: [
        "scatter plot",
        "box plot",
        "correlation heatmap",
        "bar chart",
        "histogram with splits"
      ]
    }
  };
}
