import json

def process_file(input_file, output_file):
    with open(input_file, 'r') as infile:
        file_contents = infile.read()
    
    # Replace single quotes with double quotes
    json_content = file_contents.replace("'", '"')
    
    # Try to parse the modified content to validate it as JSON
    try:
        parsed_data = json.loads(json_content)
        with open(output_file, 'w') as outfile:
            json.dump(parsed_data, outfile, indent=4)
        print("File successfully parsed and saved as valid JSON.")
    except json.JSONDecodeError as e:
        print(f"Error: {e}")
        print("The file could not be parsed as JSON due to invalid content.")

if __name__ == "__main__":
    input_file = "number_series.txt"  # Replace with your input file name
    output_file = "Number_Series.json"  # Replace with the desired output JSON file name

    process_file(input_file, output_file)
