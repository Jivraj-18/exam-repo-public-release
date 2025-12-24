import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-web-scraping";
  const title = "Web Scraping: E-Commerce Price Tracker (HTML)";

  const random = seedrandom(`${user.email}#${id}`);
  
  const products = [
    "Gaming Laptop", "Wireless Mouse", "Mechanical Keyboard", "HD Monitor", 
    "USB-C Hub", "Noise Cancelling Headphones", "Webcam 4K", "Ergonomic Chair", 
    "Standing Desk", "External SSD 1TB", "Smart Watch", "Tablet Pro", 
    "Graphics Card", "Portable Speaker", "Drone 4K", "VR Headset"
  ];
  
  const adjectives = ["Pro", "Elite", "Max", "Ultra", "Slim", "RGB", "Wireless", "2025 Edition"];
  
  const tags = ["Best Seller", "New Arrival", "On Sale", "Limited Stock", "Editor's Choice"];

  // Generate 100-150 random products (High volume to force automation)
  const numItems = Math.floor(random() * 50) + 100; 
  const items = [];
  
  for(let i=0; i<numItems; i++) {
    let name = products[Math.floor(random() * products.length)];
    // 50% chance to add an adjective
    if(random() > 0.5) {
        name += ` ${adjectives[Math.floor(random() * adjectives.length)]}`;
    }
    // Rare chance for unique ID to avoid collisions
    if(random() > 0.8) {
        name += ` v${Math.floor(random() * 9) + 1}`;
    }

    const price = Math.floor(random() * 900) + 25; // $25 - $925
    const tag = random() > 0.6 ? tags[Math.floor(random() * tags.length)] : null;
    const rating = (Math.floor(random() * 20) + 30) / 10; // 3.0 to 5.0
    
    items.push({ name, price, tag, rating });
  }

  // Shuffle items
  items.sort(() => random() - 0.5);

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Daily Deals</title>
    <style>
        :root {
            --primary: #3b82f6;
            --dark: #1f2937;
            --light: #f3f4f6;
            --accent: #ef4444;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--light);
            margin: 0;
            color: #333;
        }
        header {
            background-color: var(--dark);
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
        }
        .product-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.15);
        }
        .image-placeholder {
            height: 200px;
            background-color: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 3rem;
        }
        .content {
            padding: 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        .badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: var(--accent);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        .product-name {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
            color: var(--dark);
        }
        .description {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
            flex-grow: 1;
        }
        .rating {
            color: #fbbf24;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
        }
        .price {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--dark);
        }
        .currency {
            font-size: 0.8rem;
            vertical-align: top;
        }
        .btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn:hover {
            background-color: #2563eb;
        }
    </style>
</head>
<body>

    <header>
        <h1>TechStore</h1>
        <nav>
            <a href="#" style="color:white; margin-left: 1rem; text-decoration:none">Home</a>
            <a href="#" style="color:white; margin-left: 1rem; text-decoration:none">Deals</a>
            <a href="#" style="color:white; margin-left: 1rem; text-decoration:none">Cart</a>
        </nav>
    </header>

    <div class="container">
        <h2>Todays Featured Deals</h2>
        <div id="product-list" class="grid">
            ${items.map(item => `
            <div class="product-card" data-category="tech">
                ${item.tag ? `<span class="badge">${item.tag}</span>` : ""}
                <div class="image-placeholder">📷</div>
                <div class="content">
                    <h3 class="product-name">${item.name}</h3>
                    <div class="rating">★ ${item.rating}</div>
                    <p class="description">Experience the next generation of technology with the ${item.name}. Limited time offer.</p>
                    <div class="footer">
                        <div class="pricing">
                            <span class="currency">$</span><span class="price">${item.price}</span>.00
                        </div>
                        <button class="btn">Add to Cart</button>
                    </div>
                </div>
            </div>`).join("\n            ")}
        </div>
    </div>

    <footer style="background:#1f2937; color:white; text-align:center; padding: 2rem; margin-top: 4rem;">
        <p>&copy; 2025 TechStore Inc. All rights reserved.</p>
    </footer>

</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });

  // Logic: Find Most Expensive Product Name
  let maxPrice = -1;
  let mostExpensiveItem = "";
  
  items.forEach(item => {
    if(item.price > maxPrice) {
      maxPrice = item.price;
      mostExpensiveItem = item.name;
    }
  });

  const expected = mostExpensiveItem;

  const answer = (input) => {
    if(!input) return false;
    return input.trim().toLowerCase() === expected.toLowerCase();
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: E-Commerce Price Monitor</h4>
      <p>
        You are a **Data Engineer** building a price monitoring bot for a retail analytics firm. 
        Your task is to scrape the "Daily Deals" page of a competitor site, <strong>TechStore</strong>, to find their most expensive offering.
      </p>
      
      <h3>Task</h3>
      <ol>
        <li>Download the HTML file below. (You can open it in your browser to inspect the structure).</li>
        <li>Parse the HTML to extract the <strong>Product Name</strong> and <strong>Price</strong> for every item in the <code>#product-list</code>.</li>
        <li>Identify the single <strong>Most Expensive Product</strong>.</li>
        <li>Return the <strong>Name</strong> of that product exactly as it appears in the H3 tag (e.g. "Gaming Laptop Pro").</li>
      </ol>
      
      <p>
        Download HTML:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.html`)}>
          ${id}.html
        </button>
        <a href="${URL.createObjectURL(blob)}" target="_blank" class="btn btn-sm btn-outline-secondary ms-2" style="text-decoration:none;">
          Preview Page ↗
        </a>
      </p>

      <label for="${id}" class="form-label">Most Expensive Product Name:</label>
      <input type="text" class="form-control" name="${id}" id="${id}">
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
  Python Solution (BeautifulSoup):
  
  from bs4 import BeautifulSoup
  
  with open("q-web-scraping.html", "r") as f:
      soup = BeautifulSoup(f, "html.parser")
      
  max_price = -1
  best_item = ""
  
  # Note: The class names might have changed in the new design
  # Card -> div.product-card
  # Name -> h3.product-name
  # Price -> span.price
  
  for card in soup.find_all("div", class_="product-card"):
      name = card.find("h3", class_="product-name").text
      price_text = card.find("span", class_="price").text
      price = int(price_text)
      
      if price > max_price:
          max_price = price
          best_item = name
          
  print(best_item)
*/
