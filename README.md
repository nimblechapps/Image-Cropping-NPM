# Multiple Image Cropping

A React component for cropping multiple images with features like rotation and selection. Ideal for handling image editing in modern web applications.

Table of Contents

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)


## Installation

You can install the package via npm or yarn:

```bash
npm install multiple-image-crop-react

or 

yarn add multiple-image-crop-react


## Usage

Once installed, you can use the `MultipleImageCropping` component in your React application. Import the component and include it in your JSX. You need to provide callback functions to handle the cropped images and any cancellation events.

Here’s a basic example of how to use the component:

```jsx
import React from 'react';
import MultipleImageCropping from 'multiple-image-crop-react';

const App = () => {
  // This function is called when the user completes cropping the images.
  // It receives an array of cropped image objects as its parameter.
  const handleImageCrop = (croppedImages) => {
    // Process the array of cropped images here
    console.log(croppedImages);
  };

  // This function is called if the user cancels the cropping process.
  // It can be used to handle or clear images as needed.
  const handleCancle = (clearImage) => {
    console.log('Image cropping cancelled:', clearImage);
  };

  return (
    <div>
      <h1>Image Cropping Example</h1>
      <MultipleImageCropping onUpload={handleImageCrop} onCancle={handleCancle} />
    </div>
  );
};

export default App;



Example


### 6. **Examples**

Provide additional examples or a live demo link if available.

```markdown
## Examples

# You can view a live demo of this component at [Live Demo](https://example.com/demo).

**Example Code:**

```jsx
import React from 'react';
import MultipleImageCropping from 'multiple-image-cropping';

const handleCancle = (value)=>{
  console.log(value)
}

const Example = () => (
  <div style={{ padding: '20px' }}>
    <h1>Example Usage</h1>
    <MultipleImageCropping onUpload={handleUpload} onCancle={handleCancle}/>
  </div>
);

export default Example;
