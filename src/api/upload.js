export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  const result = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });
  let img = await result.json();
  return img.url;
}
