# React Sentence Comparison - README

## Introduction

Welcome to the React Sentence Comparison project! This repository contains a React application that uses the `patienceDiff` function from `sentenceCompare.js` to compare two sentences and visualize the differences. The differences are displayed in a React component in `App.js`.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone [repository-url]
   ```

2. Install the necessary dependencies:

   ```bash
   cd [project-folder]
   yarn
   ```

3. Run the application:

   ```bash
   yarn start
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

## Code Explanation

### `sentenceCompare.js`

This file contains the `patienceDiff` function, which compares two arrays of lines (sentences) and provides detailed information about the differences. The function uses the patience diff algorithm to identify added, deleted, and moved lines.

Key functions in `sentenceCompare.js`:

- `findUnique`: Finds unique lines in a given array within a specified range.

- `uniqueCommon`: Finds common lines between two arrays and returns their indices.

- `longestCommonSubsequence`: Determines the longest common subsequence of unique common lines.

- `addToResult`: Adds lines to the result array with indices and tracks moved lines.

- `addSubMatch`: Adds submatches to the result array.

- `recurseLCS`: Recursively processes the longest common subsequence.

- `patienceDiff`: Main function that orchestrates the line comparison.

### `App.js`

This file contains the React application that utilizes the `patienceDiff` function to compare sentences. The differences are visualized by coloring added words in blue and removed words in red.

Key components in `App.js`:

- `App`: The main React component that renders the sentence comparison.

- `diff.lines.map`: Maps over the lines from the comparison result and applies styling to added and removed words.

Feel free to explore, experiment, and enhance the React Sentence Comparison project! Happy coding! 🚀👩‍💻👨‍💻