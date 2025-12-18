export default function ({ user, weight = 1 }) {
  return {
    id: "devtools_dom",
    weight,
    question: `
You inspect the following HTML in DevTools:

<ul>
  <li class="item featured" data-price="120"></li>
  <li class="item sale" data-price="80"></li>
  <li class="item featured sale" data-price="150"></li>
  <li class="item featured sale" data-price="90"></li>
</ul>

Using the selector:
.item.featured.sale

What is the sum of the data-price values?
`,
    answer: "240",
  };
}
