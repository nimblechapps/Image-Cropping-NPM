# multiple-image-crop-react

## Requirements

* NodeJS Version 18.17.0

* NPM Version 9.6.7

## Common setup



* Command to inatall the dependencies:

  ```bash
  npm install multiple-image-crop-react

  or

  yarn add multiple-image-crop-react 

  ```


## uses

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
      <MultipleImageCropping onUpload={handleImageCrop} onCancel={handleCancle} />
    </div>
  );
};

export default App;

jsx```



  