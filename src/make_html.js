const imagePaths = `assets/iskon:
IMG-20240915-WA0013.jpg
IMG-20240915-WA0019.jpg
IMG-20240915-WA0023.jpg
IMG-20240915-WA0029.jpg
IMG-20240915-WA0037.jpg
IMG-20240915-WA0039.jpg
IMG-20240915-WA0040.jpg
IMG_20240915_122637.jpg
IMG_20240915_123240.jpg
IMG_20240915_123251.jpg

assets/outbound:
IMG_20240911_100238.jpg
IMG_20240911_100430.jpg
IMG_20240911_100519.jpg
IMG_20240911_100600.jpg
IMG_20240911_100622.jpg
IMG_20240911_100638.jpg
IMG_20240911_100646.jpg
IMG_20240911_100730.jpg
IMG_20240911_100840.jpg
IMG_20240911_100925.jpg
IMG_20240911_101207.jpg
IMG_20240911_101606.jpg
IMG_20240911_101615.jpg
IMG_20240911_101700.jpg
IMG_20240911_101857.jpg
IMG_20240911_102047.jpg
IMG_20240911_102225.jpg
IMG_20240911_102701.jpg
IMG_20240911_102708.jpg
IMG_20240911_102718.jpg
IMG_20240911_102921.jpg
IMG_20240911_103105.jpg
IMG_20240911_104217.jpg
IMG_20240911_104444.jpg
IMG_20240911_104528.jpg
IMG_20240911_105059.jpg
IMG_20240911_105415.jpg
IMG_20240911_105421.jpg
IMG_20240911_110741.jpg
IMG_20240911_110743.jpg
IMG_20240911_110858.jpg
IMG_20240911_111821.jpg
IMG_20240911_112014.jpg
IMG_20240911_112154.jpg
IMG_20240911_112458.jpg
IMG_20240911_112726.jpg
IMG_20240911_112901.jpg
IMG_20240911_112942.jpg
IMG_20240911_113113.jpg
IMG_20240911_113118.jpg
IMG_20240911_113317.jpg
IMG_20240911_113454.jpg
IMG_20240911_113534.jpg
IMG_20240911_113553.jpg
IMG_20240911_113800.jpg
IMG_20240911_120621.jpg
IMG_20240911_124638.jpg
IMG_20240911_124757.jpg

assets/shivoham_shiva:
IMG_20240817_123049.jpg
IMG_20240817_123400.jpg
IMG_20240817_124026.jpg
IMG_20240817_124451.jpg
IMG_20240817_125357.jpg
IMG_20240817_130627.jpg
IMG_20240817_132157.jpg
IMG_20240817_132211.jpg
IMG_20240817_132649.jpg`;

const parseImagePaths = (imagePaths) =>
  imagePaths.split("\n\n").map((imgPath) => {
    const [directory, allFiles] = imgPath.split(":\n");
    return { directory, files: allFiles.split("\n") };
  });

const images = parseImagePaths(imagePaths);
const concatPathWithDir = ({ directory, files }) =>
  files.map((file) => `../${directory}/${file}`);

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const intoHtml = (tags, selfClosingTags = ["img", "embed"]) => {
  if (!Array.isArray(tags)) return tags;

  const [tag, attributes, ...innerHtml] = tags;
  const attributesStr = Object.entries(attributes).map(
    ([property, value]) => `${property}='${value}'`
  );

  if (selfClosingTags.includes(tag)) return `<${tag} ${attributesStr}/>`;

  return `<${tag} ${attributesStr}>${innerHtml
    .map((tags) => intoHtml(tags, selfClosingTags))
    .join("")}</${tag}>`;
};

const makeImageTags = (images) =>
  images.map((imgPath) => ["img", { src: imgPath }]);

const makeHtmlPages = (images) =>
  images
    .map(concatPathWithDir)
    .map((imagePaths) => [
      "html",
      {},
      ["head", {}],
      ["body", {}, ...makeImageTags(imagePaths)],
    ]);

const htmlFileContents = makeHtmlPages(images).map((tags) => intoHtml(tags));

console.log(htmlFileContents.at(2));
