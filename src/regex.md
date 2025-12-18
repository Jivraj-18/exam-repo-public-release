### Question Information: RegEx Data Cleaning

This question tests your ability to use regular expressions (regex) to clean and standardize messy data. You'll need to:

- Parse JSON data with formatting inconsistencies
- Write regex patterns to match and extract information
- Use regex replacements to standardize formats
- Validate data against specific patterns
- Count records that meet validation criteria

### Common Regex Patterns:

- Email validation: `/^[^@]+@[^@]+$/`
- Phone digits: `/\\d/g`
- Customer ID format: `/^CUST-\\d{5}$/`
- Whitespace: `/\\s+/g`
- Multiple characters: `/\\.+/g`

### Useful Methods:

- `string.match(regex)` - Find matches
- `string.replace(regex, replacement)` - Replace matches
- `string.trim()` - Remove whitespace
- `regex.test(string)` - Test if pattern matches

### Tools:

- Python: `re` module (`re.sub()`, `re.findall()`)
- JavaScript: String methods with regex
- Online regex testers: regex101.com, regexr.com
