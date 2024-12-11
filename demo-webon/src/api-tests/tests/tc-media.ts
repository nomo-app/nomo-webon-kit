import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class NomoPickFilesTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.pickFiles() Single",
      description: "Test picking a single file",
    });
  }

  async run() {
    // Test 1: Pick a single file of any type
    const singleFileResult = await nomo.pickFiles({
      fileType: "any",
      dialogTitle: "Select a single file",
      allowMultiple: false,
    });

    if (!singleFileResult.files || singleFileResult.files.length !== 1) {
      throw new Error("Failed to pick a single file");
    }

    // Validate basic file properties
    const singleFile = singleFileResult.files[0];
    if (!singleFile.name) {
      throw new Error("Picked file should have a name");
    }
    if (singleFile.size <= 0) {
      throw new Error("Picked file should have a positive size");
    }
    if (!singleFile.bytesBase64) {
      throw new Error("Picked file should have base64 content");
    }
  }
}

class NomoPickMultipleFilesTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.pickFiles() Multiple",
      description: "Test picking multiple files",
    });
  }

  async run() {
    // Test 2: Pick multiple image files with specific extensions
    const multiImageResult = await nomo.pickFiles({
      fileType: "custom", // custom is needed for allowedExtensions
      dialogTitle: "Select multiple image files",
      allowMultiple: true,
      allowedExtensions: [".jpg", ".png"],
      allowCompression: true,
    });

    if (!multiImageResult.files) {
      throw new Error("Failed to pick multiple image files");
    }

    // Ensure at least one file is picked when allowing multiple
    if (multiImageResult.files.length < 1) {
      throw new Error("Expected at least one image file to be picked");
    }
  }
}

class NomoPickFromGalleryTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.pickFromGallery()",
      description: "Test picking an image from gallery with size constraints",
    });
  }

  async run() {
    // Test image gallery pick with size constraints
    const galleryPickResult = await nomo.pickFromGallery({
      maxWidth: 1024,
      maxHeight: 1024,
      imageQuality: 80,
    });

    if (!galleryPickResult.path) {
      throw new Error("Failed to pick image from gallery");
    }

    if (!galleryPickResult.imageBase64) {
      throw new Error("Picked gallery image should have base64 representation");
    }
  }
}

class NomoTakePictureTest extends NomoTest {
  constructor() {
    super({
      name: "nomo.takePicture()",
      description: "Test taking a picture",
    });
  }

  async run() {
    const defaultPictureResult = await nomo.takePicture();
    this.validatePicture(defaultPictureResult);
  }

  private validatePicture(pictureResult: {
    path: string;
    imageBase64: string;
  }) {
    // Check path
    if (!pictureResult.path) {
      throw new Error("Picture should have a path");
    }

    // Check base64 image
    if (!pictureResult.imageBase64) {
      throw new Error("Picture should have a base64 image representation");
    }

    // Validate base64 image starts with correct prefix
    if (!pictureResult.imageBase64.startsWith("data:image/png;base64,")) {
      throw new Error("Base64 image should start with correct data URI prefix");
    }

    // Optional: Check base64 image length (basic sanity check)
    const base64Content = pictureResult.imageBase64.split(",")[1];
    if (!base64Content || base64Content.length < 1000) {
      throw new Error("Base64 image content seems too short");
    }
  }
}

export const nomoMediaTests: Array<NomoTest> = [
  new NomoPickFilesTest(),
  new NomoPickMultipleFilesTest(),
  new NomoPickFromGalleryTest(),
  new NomoTakePictureTest(),
];
