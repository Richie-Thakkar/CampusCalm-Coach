import re
import json

# Read the text file
with open('logical_reasoning.txt', 'r') as file:
    file_contents = file.read()
    file_contents=file_contents.replace("'", '"')
# Split the file contents into sections using the titles as delimiters
sections = re.split(r'\n\s*\n', file_contents)

# Initialize a list to store the parsed JSON data
parsed_data = []

# Loop through the sections
for section in sections:
    # Split the section into lines
    lines = section.split('\n')

    # Check if there are at least two lines (title and JSON data)
    if len(lines) >= 2:
        # Extract the JSON data, starting from the second line
        json_data = '\n'.join(lines[1:])
        
        try:
            # Parse the JSON data
            parsed_json = json.loads(json_data)
            parsed_data.append(parsed_json)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON section: {e}")
            continue

# Now, 'parsed_data' contains a list of dictionaries, each representing a section's JSON data
# You can access and work with these JSON arrays as needed
